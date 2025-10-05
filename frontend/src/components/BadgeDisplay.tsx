import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import type { BadgeResponse } from './types';
import { AtSign, Phone, Linkedin, Github } from 'lucide-react';
import './print.css';

interface BadgeDisplayProps {
  badge: BadgeResponse | null;
}

export default function BadgeDisplay({ badge }: BadgeDisplayProps) {
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [saving, setSaving] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  if (!badge) {
    return (
      <div className="badge-placeholder">
        <p>Fill the form to generate a badge</p>
      </div>
    );
  }

  const handlePrint = (blackAndWhite: boolean) => {
    if (blackAndWhite) {
      document.body.classList.add('print-bw');
    } else {
      document.body.classList.remove('print-bw');
    }

    window.print();

    setTimeout(() => {
      document.body.classList.remove('print-bw');
    }, 100);

    setShowPrintOptions(false);
  };

  const handleSavePNG = async () => {
    if (!badgeRef.current) return;

    setSaving(true);

    try {
      const canvas = await html2canvas(badgeRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = `badge-${badge.attendee.name
          .toLowerCase()
          .replace(/\s+/g, '-')}.png`;

        link.href = url;
        link.download = fileName;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Failed to save image. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="badge-container">
      <div
        className="badge"
        ref={badgeRef}
      >
        <h1>{badge.attendee.name}</h1>

        <div className="badge-info">
          <p>
            <AtSign size={18} /> {badge.attendee.email}
          </p>

          {badge.attendee.phone && (
            <p>
              <Phone size={18} /> {badge.attendee.phone}
            </p>
          )}

          <p>
            <Linkedin size={18} /> linkedin.com/in/
            {badge.attendee.linkedin}
          </p>
          <p>
            <Github size={18} /> github.com/{badge.attendee.github}
          </p>
        </div>

        <div className="qr-section">
          <img
            src={badge.qr_code}
            alt="QR Code"
            className="qr-code"
          />
          <p className="qr-label">
            Scan for {badge.attendee.qr_target}
          </p>
        </div>
      </div>

      <div className="action-buttons">
        <button
          onClick={handleSavePNG}
          className="save-btn"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save as PNG'}
        </button>

        {!showPrintOptions ? (
          <button
            onClick={() => setShowPrintOptions(true)}
            className="print-btn main-print-btn"
          >
            Print Badge
          </button>
        ) : (
          <div>
            <p className="print-options">Choose print style:</p>
            <div className="print-buttons">
              <button
                onClick={() => handlePrint(true)}
                className="print-btn print-bw-btn"
              >
                Black & White
              </button>
              <button
                onClick={() => handlePrint(false)}
                className="print-btn print-color"
              >
                Color
              </button>
              <button
                onClick={() => setShowPrintOptions(false)}
                className="print-btn print-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
