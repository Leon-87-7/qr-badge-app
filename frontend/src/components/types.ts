export type QRTarget = 'linkedin' | 'github' | 'personal';
export interface AttendeeData {
  name: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  qr_target: QRTarget;
}

export interface BadgeResponse {
  attendee: AttendeeData;
  qr_code: string;
  qr_url: string;
}
