import { useState } from 'react';
import axios from 'axios';
import type { AttendeeData, BadgeResponse } from './types';

interface BadgeFormProps {
  onBadgeGenerated: (badge: BadgeResponse) => void;
}

export default function BadgeForm({
  onBadgeGenerated,
}: BadgeFormProps) {
  const [formData, setFormData] = useState<AttendeeData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    qr_target: 'personal',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://qrmeback.up.railway.app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<BadgeResponse>(
        `${API_URL}/generate-qr`,
        formData
      );
      onBadgeGenerated(response.data);
    } catch (err) {
      setError('Failed to generate badge. Check backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <h2>Generate Badge</h2>

      <div className="form-stack">
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-control">
          <label>Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className="form-control">
          <label>LinkedIn username</label>
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({
                ...formData,
                linkedin: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-control">
          <label>GitHub username</label>
          <input
            type="text"
            value={formData.github}
            onChange={(e) =>
              setFormData({
                ...formData,
                github: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-control">
          <label>Select QR Code Target</label>

          <select
            value={formData.qr_target}
            onChange={(e) =>
              setFormData({
                ...formData,
                qr_target: e.target.value as any,
              })
            }
          >
            <option value="personal">Personal (vCard)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="github">GitHub</option>
          </select>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Generating...' : 'Generate Badge'}
      </button>
    </form>
  );
}
