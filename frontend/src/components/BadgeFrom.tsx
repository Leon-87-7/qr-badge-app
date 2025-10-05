import { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  TextInput,
  Select,
  Button,
  Stack,
} from '@primer/react-brand';
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

      <Stack
        direction="vertical"
        gap="condensed"
      >
        <FormControl
          fullWidth
          required
        >
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            Name
          </FormControl.Label>
          <TextInput
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />
        </FormControl>

        <FormControl
          fullWidth
          required
        >
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            Email
          </FormControl.Label>
          <TextInput
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            Phone (optional)
          </FormControl.Label>
          <TextInput
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl
          fullWidth
          required
        >
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            LinkedIn username
          </FormControl.Label>
          <TextInput
            type="text"
            placeholder="LinkedIn username"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({
                ...formData,
                linkedin: e.target.value,
              })
            }
            required
          />
        </FormControl>

        <FormControl
          fullWidth
          required
        >
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            GitHub username
          </FormControl.Label>
          <TextInput
            type="text"
            placeholder="GitHub username"
            value={formData.github}
            onChange={(e) =>
              setFormData({
                ...formData,
                github: e.target.value,
              })
            }
            required
          />
        </FormControl>

        <FormControl>
          <FormControl.Label style={{ color: 'antiquewhite' }}>
            Select QR Code Target
          </FormControl.Label>
          <Select
            value={formData.qr_target}
            onChange={(e) =>
              setFormData({
                ...formData,
                qr_target: e.target.value as any,
              })
            }
          >
            <Select.Option value="personal">
              Personal (vCard)
            </Select.Option>
            <Select.Option value="linkedin">LinkedIn</Select.Option>
            <Select.Option value="github">GitHub</Select.Option>
          </Select>
        </FormControl>
      </Stack>

      {error && <p className="error">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        variant="primary"
      >
        {loading ? 'Generating...' : 'Generate Badge'}
      </Button>
    </form>
  );
}
