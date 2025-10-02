import { useState } from 'react';
import type { BadgeResponse } from './types';
import './print.css';

interface BadgeDisplayProps {
  badge: BadgeResponse | null;
}

export default function BadgeDisplay({ badge }: BadgeDisplayProps) {
  const [showPrintOptions, setShowPrintOptions] = useState(false);

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

    // Clean up after print
    setTimeout(() => {
      document.body.classList.remove('print-bw');
    }, 100);

    setShowPrintOptions(false);
  };

  return (
    <div className="badge-container">
      <div className="badge">
        <h1>{badge.attendee.name}</h1>

        <div className="badge-info">
          <p>📧 {badge.attendee.email}</p>

          {badge.attendee.phone && <p>📱 {badge.attendee.phone}</p>}

          <p>💼 linkedin.com/in/{badge.attendee.linkedin}</p>
          <p>💻 github.com/{badge.attendee.github}</p>
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

      {!showPrintOptions ? (
        <button
          onClick={() => setShowPrintOptions(true)}
          className="print-btn"
        >
          Print Badge
        </button>
      ) : (
        <div className="print-options">
          <p>Choose print style:</p>
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
  );
}
