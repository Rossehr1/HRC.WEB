# Historic Reenactors Website

Next.js web application for Historic Reenactors - bringing history to life through authentic reenactments.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
historicreenactors/
├── app/                    # Next.js App Router
│   ├── (site)/            # Site pages (route group)
│   │   ├── page.tsx       # Home page
│   │   ├── about/
│   │   ├── programs/
│   │   ├── book-us/
│   │   ├── join/
│   │   ├── sponsors/
│   │   ├── safety/
│   │   ├── media-kit/
│   │   └── contact/
│   └── api/               # API routes
│       └── contact/
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Accordion.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       └── Form.tsx
├── content/               # Content files (MDX/Git CMS)
│   ├── events/
│   └── posts/
├── public/                # Static assets
│   ├── logos/
│   ├── media-kit/
│   └── photos/
├── lib/                   # Utility functions
│   ├── seo.ts
│   └── constants.ts
└── styles/                # Global styles
    └── globals.css
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

All changes will be deployed to this repository.

### FTP Configuration

FTP credentials are stored in the `.env` file (not committed to git for security).

To set up FTP credentials:
1. Copy `.env.example` to `.env`
2. Fill in your FTP credentials in the `.env` file

**FTP Server Details:**
- Host: `92.112.189.73`
- User: `u660126262.historicreenactors.com`
- URL: `ftp://92.112.189.73`

The `.env` file contains sensitive information and is excluded from version control via `.gitignore`.
