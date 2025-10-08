import { useState } from 'react';
import axios from 'axios';
import type { AttendeeData, BadgeResponse } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="text-text text-2xl font-bold">Generate Badge</h2>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-text">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
            className="bg-background text-text border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-text">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
            className="bg-background text-text border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-text">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            className="bg-background text-text border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="linkedin" className="text-text">
            LinkedIn username
          </Label>
          <Input
            id="linkedin"
            type="text"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({
                ...formData,
                linkedin: e.target.value,
              })
            }
            required
            className="bg-background text-text border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="github" className="text-text">
            GitHub username
          </Label>
          <Input
            id="github"
            type="text"
            value={formData.github}
            onChange={(e) =>
              setFormData({
                ...formData,
                github: e.target.value,
              })
            }
            required
            className="bg-background text-text border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="qr-target" className="text-text">
            Select QR Code Target
          </Label>
          <Select
            value={formData.qr_target}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                qr_target: value as any,
              })
            }
          >
            <SelectTrigger className="bg-background text-text border-accent">
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal (vCard)</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <p className="text-error text-sm px-3 py-2 bg-red-100 rounded">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-text hover:bg-primary-hover"
      >
        {loading ? 'Generating...' : 'Generate Badge'}
      </Button>
    </form>
  );
}
