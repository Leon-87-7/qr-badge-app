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
- **QRTarget enum**: `linkedin`, `github`, `personal`
- **AttendeeData model**: Pydantic model for form data validation
- **`/generate-qr` endpoint**: Generates QR codes with different formats:
  - LinkedIn: Direct URL link
  - GitHub: Direct URL link
  - Personal: vCard format with all contact details
- CORS configured for localhost, Railway, and Vercel domains

### Frontend Structure
- **App.tsx**: Main component managing badge state
- **components/BadgeFrom.tsx**: Form for user input, posts to backend API
  - API URL hardcoded: `https://qrmeback.up.railway.app`
- **components/BadgeDisplay.tsx**: Renders badge with QR code
  - Print functionality (color/B&W toggle)
  - PNG export using html2canvas
- **components/types.ts**: Shared TypeScript types matching backend models
- **components/print.css**: Print-specific styles

### Build Configuration
- Uses Vite with SWC plugin for fast refresh
- `rolldown-vite` package override for experimental Rolldown bundler
- TypeScript strict mode enabled
- ESLint configured for React + TypeScript

## Deployment

- **Frontend**: Vercel (uses nixpacks.toml for build config)
- **Backend**: Railway (uses Procfile for deployment)
- Backend CORS allows requests from both localhost and production domains

## API Integration

Backend endpoint: `POST /generate-qr`
- Accepts `AttendeeData` JSON
- Returns `BadgeResponse` with base64-encoded QR image
- QR formats: LinkedIn URL, GitHub URL, or vCard (personal)
