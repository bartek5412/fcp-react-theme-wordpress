# FCP React Theme

Modern WordPress theme built with React, TypeScript, and Vite.

## 🚀 Features

- ⚛️ **React 18** - Latest React with hooks
- 📘 **TypeScript** - Type-safe development
- ⚡ **Vite** - Fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔄 **React Query** - Efficient data fetching
- 🛣️ **React Router** - Client-side routing
- 📱 **Responsive** - Mobile-first design
- 🎯 **WordPress REST API** - Headless-ready

## 📦 Installation

### Install Dependencies

```bash
cd wp-content/themes/fcp-react-theme
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

This will:

- Start Vite dev server on `http://localhost:3000`
- Proxy WordPress API requests to your WordPress site
- Hot Module Replacement (HMR) for instant updates

### Build for Production

```bash
npm run build
```

This compiles TypeScript and bundles React app into `dist/` directory.

### Type Checking

```bash
npm run type-check
```

## 📁 Project Structure

```
fcp-react-theme/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   └── PostPage.tsx
│   ├── utils/           # Utilities
│   │   └── api.ts       # WordPress REST API functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── dist/                # Built files (generated)
├── functions.php        # WordPress theme functions
├── index.php            # Main template
├── header.php           # Header template
├── footer.php           # Footer template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

