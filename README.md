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
│   ├── layout/            # Header, Footer, Container
│   ├── sections/          # Hero, ValueProps, CTA
│   └── forms/             # BookingForm, ContactForm
├── content/
│   ├── events/
│   └── posts/
├── public/                # logos, media-kit, photos
├── lib/                    # seo, constants, validators
└── app/globals.css
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment (production: https://historicreenactors.com)

1. **Publish to Git:** `git add -A && git commit -m "..." && git push origin master`
2. **Deploy via FTP:** `npm run deploy` (uses `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` from `.env`)

Copy `.env.example` to `.env` and set FTP credentials. The `.env` file is not committed to git.
