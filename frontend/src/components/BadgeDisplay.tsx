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
      <div className="h-full flex items-center justify-center text-blue-400 text-center">
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
    <div className="flex flex-col gap-4">
      <div
        className="badge border-2 border-blue-600 rounded-lg p-8 mx-auto bg-gradient-badge text-text-dark flex flex-col items-center print-badge-color"
        ref={badgeRef}
      >
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">
          {badge.attendee.name}
        </h1>

        <div className="mb-6">
          <p className="font-mono mx-8 my-1.5 text-sm flex items-center gap-2">
            <AtSign size={18} /> {badge.attendee.email}
          </p>

          {badge.attendee.phone && (
            <p className="font-mono mx-8 my-1.5 text-sm flex items-center gap-2">
              <Phone size={18} /> {badge.attendee.phone}
            </p>
          )}

          <p className="font-mono mx-8 my-1.5 text-sm flex items-center gap-2">
            <Linkedin size={18} /> linkedin.com/in/
            {badge.attendee.linkedin}
          </p>
          <p className="font-mono mx-8 my-1.5 text-sm flex items-center gap-2">
            <Github size={18} /> github.com/{badge.attendee.github}
          </p>
        </div>

        <div className="bg-transparent max-w-xs p-4 rounded-lg text-center">
          <img
            src={badge.qr_code}
            alt="QR Code"
            className="rounded-xl w-52 h-52 block mx-auto"
          />
          <p className="mt-2 text-gray-700 text-sm font-semibold font-mono">
            Scan for {badge.attendee.qr_target} info
          </p>
        </div>
      </div>

      <div className="flex flex-col m-2">
        <button
          className="px-3 py-3 mx-auto w-4/5 bg-primary text-text border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-background-btn disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSavePNG}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save as PNG'}
        </button>

        {!showPrintOptions ? (
          <button
            onClick={() => setShowPrintOptions(true)}
            className="mt-4 w-4/5 mx-auto px-3 py-3 bg-secondary text-[#371f2e] border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-background-btn hover:text-text"
          >
            Print Badge
          </button>
        ) : (
          <div>
            <p className="font-semibold text-[#5b6a8a] text-center my-2">
              Choose print style:
            </p>
            <div className="mx-auto mt-2 flex flex-col justify-center">
              <button
                onClick={() => handlePrint(true)}
                className="w-4/5 mx-auto px-3 py-3 bg-gray-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-900"
              >
                Black & White
              </button>
              <div className="mx-auto w-4/5 mt-3 flex gap-3">
                <button
                  onClick={() => handlePrint(false)}
                  className="flex-[2] px-3 py-3 bg-secondary text-text-dark hover:text-text border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-900"
                >
                  Color
                </button>
                <button
                  onClick={() => setShowPrintOptions(false)}
                  className="flex-1 px-3 py-3 bg-gray-500 text-[#2e1b1b] border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#371f2e] hover:text-text"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
