# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Badge Generator - A full-stack application that generates printable badges with QR codes for events and conferences. Users can create badges containing contact information with QR codes linking to LinkedIn, GitHub, or a vCard with all personal details.

**Architecture:**

- **Frontend**: React + TypeScript + Vite (using rolldown-vite), deployed to Vercel
- **Backend**: FastAPI (Python), deployed to Railway
- Monorepo structure with separate `frontend/` and `backend/` directories

## Development Commands

### Frontend (from `frontend/` directory)

```bash
npm run dev          # Start dev server (Vite with HMR)
npm run build        # Type-check with tsc and build for production
npm run preview      # Preview production build locally
npm start            # Run production server (Express)
```

### Backend (from `backend/` directory)

```bash
python run.py        # Start FastAPI dev server with auto-reload
# or
uvicorn main:app --reload
```

## Application Architecture

### Data Flow

1. User fills form in `BadgeForm` component
2. Form submits to FastAPI backend `/generate-qr` endpoint
3. Backend generates QR code based on selected target (LinkedIn, GitHub, or vCard)
4. Response includes attendee data, base64-encoded QR image, and QR URL
5. `BadgeDisplay` component renders badge with QR code
6. User can print (color or B&W) or save as PNG using html2canvas

### Backend Structure (`backend/main.py`)

- Single FastAPI file handling all logic
- **Dependencies**: FastAPI 0.118.0, qrcode 8.2, Pillow 11.3.0, Pydantic 2.11.9, uvicorn 0.37.0
- **QRTarget enum**: `linkedin`, `github`, `personal`
- **AttendeeData model**: Pydantic model for form data validation (name, email, phone, linkedin, github, qr_target)
- **`/` endpoint**: Health check returning API status
- **`/generate-qr` endpoint**: Generates QR codes with different formats:
  - LinkedIn: Direct URL link (`https://www.linkedin.com/in/{username}`)
  - GitHub: Direct URL link (`https://github.com/{username}`)
  - Personal: vCard 3.0 format with all contact details (name, email, phone if provided, LinkedIn, GitHub)
  - Returns base64-encoded PNG QR image with data URI prefix, attendee data, and QR URL
- CORS configured for localhost (ports 3000 and 5173), Railway (*.up.railway.app), and Vercel (*.vercel.app) domains

### Frontend Structure

- **App.tsx**: Main component managing badge state
- **components/BadgeFrom.tsx**: Form for user input, posts to backend API
  - API URL hardcoded: `https://qrmeback.up.railway.app`
- **components/BadgeDisplay.tsx**: Renders badge with QR code
  - Print functionality with `showPrintOptions` state (color/B&W toggle)
  - PNG export using html2canvas with 2x scale for quality
  - Uses refs (`badgeRef`) and html2canvas for image capture
  - Lucide React icons: AtSign, Phone, Linkedin, Github
- **components/types.ts**: Shared TypeScript types matching backend models
- **components/print.css**: Print-specific styles

### Build Configuration

- **Vite 7.1.12** (via `rolldown-vite` override) with SWC plugin (@vitejs/plugin-react-swc 4.1.0)
- **TypeScript 5.8.3** with strict mode enabled
- **ESLint 9.36** with typescript-eslint 8.44 and React plugins
- **React 19.1.1** with React DOM
- **Tailwind CSS v3.4.18** for styling
  - Custom color palette matching original design
  - Mobile-first responsive design
  - Utility-first approach with minimal global CSS
- **Additional dependencies**:
  - Radix UI components (icons, label, select, slot)
  - Lucide React 0.544 for icons (used in BadgeDisplay)
  - html2canvas 1.4.1 for PNG export
  - Axios 1.12.2 for HTTP requests
  - Express 5.1.0 for production server
  - class-variance-authority, clsx, tailwind-merge for styling utilities

## Deployment

- **Frontend**: Vercel at `https://qrme-badge-app.vercel.app`
  - Uses nixpacks.toml for build config
  - Production server runs via Express (server.js)
  - Build script: `tsc -b && vite build`
- **Backend**: Railway at `https://qrmeback.up.railway.app`
  - Uses Procfile for deployment
  - Deployment command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Backend CORS allows requests from both localhost and production domains
- Git workflow: main branch for production

## API Integration

Backend endpoint: `POST /generate-qr`

- Accepts `AttendeeData` JSON
- Returns `BadgeResponse` with base64-encoded QR image
- QR formats: LinkedIn URL, GitHub URL, or vCard (personal)

## Styling Architecture

### Tailwind CSS Configuration

The project uses **Tailwind CSS v3.4.x** with a custom configuration that preserves the original color scheme:

**Custom Colors** (defined in `tailwind.config.ts`):
- `primary`: Purple CTA color (hsl(288, 37%, 46%))
- `secondary`: Green accent (hsl(145, 76%, 56%))
- `accent`: Blue highlight (hsl(215, 88%, 70%))
- `background`: Dark background (hsl(215, 28%, 17%))
- `text`: Light cream text (hsl(34, 78%, 91%))

**Custom Gradients**:
- `bg-gradient-header`: Green to purple gradient for header
- `bg-gradient-badge`: Multi-color gradient for badge display

**Configuration Files**:
- `tailwind.config.ts`: Tailwind v3 configuration with custom theme
- `postcss.config.mjs`: PostCSS configuration for Tailwind
- `src/index.css`: Contains @tailwind directives and base styles
- `src/App.css`: Minimal component-specific styles (print utilities only)

**Styling Guidelines**:
- Use Tailwind utility classes in components (not global CSS)
- Responsive design with mobile-first approach (`md:`, `lg:` prefixes)
- Keep global CSS minimal - only for print styles and base resets
- Color classes reference the custom palette (e.g., `bg-primary`, `text-text`)
