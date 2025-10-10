# QR Badge Generator

A full-stack application that generates printable event badges with QR codes for conferences and networking events. Create professional badges containing contact information with QR codes linking to LinkedIn, GitHub, or a complete vCard.

![Badge Preview](https://img.shields.io/badge/React-19.1.1-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4.x-blue)

## Features

- **Multiple QR Code Targets**: Generate QR codes that link to:
  - LinkedIn profile
  - GitHub profile
  - Personal vCard (with all contact details)
- **Print Ready**: Export badges in color or black & white
- **PNG Export**: Save badges as PNG images using html2canvas
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern Stack**: React 19, TypeScript, FastAPI

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** (with Rolldown bundler)
- **Tailwind CSS v3.4.x** with custom design system
- **shadcn/ui** components
- **html2canvas** for PNG export
- Deployed on **Vercel**

### Backend
- **FastAPI** (Python)
- **qrcode** library for QR generation
- **Pydantic** for data validation
- Deployed on **Railway**

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Leon-87-7/qr-badge-app.git
   cd qr-badge-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Development

1. **Start the backend server** (from `backend/` directory)
   ```bash
   python run.py
   # or
   uvicorn main:app --reload
   ```
   Backend runs on `http://localhost:8000`

2. **Start the frontend dev server** (from `frontend/` directory)
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

**Backend:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Project Structure

```
qr-badge-app/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── BadgeForm.tsx       # Form for badge input
│   │   │   ├── BadgeDisplay.tsx    # Badge preview & export
│   │   │   ├── types.ts            # TypeScript types
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── App.tsx
│   │   └── index.css               # Tailwind directives
│   ├── tailwind.config.ts          # Custom Tailwind theme
│   └── package.json
│
├── backend/                 # FastAPI backend
│   ├── main.py             # API endpoints & QR generation
│   ├── run.py              # Dev server runner
│   └── requirements.txt
│
├── .vscode/                # VS Code settings
└── CLAUDE.md               # AI assistant documentation
```

## API Documentation

### POST `/generate-qr`

Generates a badge with QR code.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "linkedin": "johndoe",
  "github": "johndoe",
  "qr_target": "personal"  // or "linkedin" or "github"
}
```

**Response:**
```json
{
  "attendee": { /* attendee data */ },
  "qr_image": "data:image/png;base64,...",
  "qr_url": "https://linkedin.com/in/johndoe"
}
```

## Customization

### Tailwind Theme

The project uses a custom color palette defined in [tailwind.config.ts](frontend/tailwind.config.ts):

- **Primary**: Purple (`hsl(288, 37%, 46%)`)
- **Secondary**: Green (`hsl(145, 76%, 56%)`)
- **Accent**: Blue (`hsl(215, 88%, 70%)`)
- **Background**: Dark (`hsl(215, 28%, 17%)`)
- **Text**: Cream (`hsl(34, 78%, 91%)`)

Custom gradients:
- `bg-gradient-badge`: Badge display gradient
- `bg-gradient-header`: Header gradient

### VS Code Setup

For Tailwind CSS IntelliSense to work in the monorepo structure:

1. Install the **Tailwind CSS IntelliSense** extension
2. Workspace settings are already configured in [.vscode/settings.json](.vscode/settings.json)
3. Restart VS Code

## Deployment

### Frontend (Vercel)
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/dist`
- Uses [nixpacks.toml](nixpacks.toml) for configuration

### Backend (Railway)
- Start command: Defined in [Procfile](Procfile)
- CORS configured for production domains
- Environment variables: None required (add if needed)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your events!

## Acknowledgments

- Built with [Claude Code](https://claude.ai/code)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- QR code generation by [python-qrcode](https://github.com/lincolnloop/python-qrcode)
