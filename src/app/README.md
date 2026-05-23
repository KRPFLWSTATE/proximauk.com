# Proxima - The Future of Meaningful Connection

A modern, interactive one-page website for Proxima, a social networking app that combines real-time GPS with personality-based matching.

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment to Netlify

### Option 1: Drag and Drop (Simplest)

1. Run `npm run build` locally
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to deploy instantly

### Option 2: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 🎨 Features

- **22+ Interactive Sections** covering the complete Proxima pitch deck
- **Black & Orange Theme** (#000000 and #FF7A00) with futuristic glow effects
- **Smooth Animations** with Motion/React (formerly Framer Motion)
- **Interactive Charts** using Recharts
- **Fully Mobile Responsive** with touch-optimized UI
- **AA Accessibility** contrast compliance
- **Optimized Performance** with lazy loading and code splitting
- **2,700+ line Interactive B2B Dashboard** with full feature set
- **27 Business Features** in the Zones showcase
- **Real-time Visualizations** with live user movement and voice channels

## 📱 Mobile & Performance Optimizations

The website has been comprehensively optimized for mobile devices and performance:

- ✅ **Lazy Loading**: Below-the-fold sections load on demand
- ✅ **Responsive Grids**: All layouts adapt from mobile to desktop
- ✅ **Touch-Friendly**: 44px minimum touch targets
- ✅ **Optimized Animations**: Reduced particle effects on mobile
- ✅ **Throttled Events**: Scroll events optimized for performance
- ✅ **Image Lazy Loading**: All images load on demand
- ✅ **Mobile Meta Tags**: iOS and Android optimizations
- ✅ **Reduced Blur Effects**: Better GPU performance on mobile

See [MOBILE_PERFORMANCE_CHECKLIST.md](./MOBILE_PERFORMANCE_CHECKLIST.md) and [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md) for complete details.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion/React
- **Charts**: Recharts
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite 6

## 📁 Project Structure

```
├── index.html                          # Entry HTML with mobile meta tags
├── main.tsx                            # React entry point
├── App.tsx                             # Main app with lazy loading
├── components/                         # All React components
│   ├── HeroSection.tsx
│   ├── ZonesBusinessDashboard.tsx     # 2,700+ line interactive dashboard
│   ├── ZonesFeatureShowcase.tsx       # 27 business features
│   └── ... (20+ more sections)
├── styles/
│   ├── globals.css                     # Global styles & Tailwind config
│   └── mobile-optimizations.css       # Mobile-specific optimizations
├── utils/
│   └── performance.ts                  # Performance utility functions
├── hooks/
│   └── useViewport.ts                  # Custom viewport detection hook
├── MOBILE_PERFORMANCE_CHECKLIST.md    # Optimization checklist
├── PERFORMANCE_OPTIMIZATIONS.md       # Detailed optimization docs
├── netlify.toml                        # Netlify configuration
├── package.json                        # Dependencies
└── vite.config.ts                      # Vite configuration
```

## 🔧 Configuration

### Build Optimization

The project includes optimized build settings:
- Code splitting for React and UI vendors
- Sourcemaps disabled for production
- Manual chunks for better caching

### Netlify Settings

Already configured in `netlify.toml`:
- SPA redirects for client-side routing
- Node.js 20 environment
- Automatic builds on push

## 📝 License

Private project - All rights reserved

## 👤 Author

Proxima Team

---

Built with ❤️ for meaningful connections
