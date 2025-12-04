# Assets Folder

This folder contains all static assets used in the portfolio.

## Structure

```
assets/
├── images/    # Image files (jpg, png, svg, webp)
├── fonts/     # Custom font files (woff, woff2, ttf)
└── icons/     # Custom SVG icons (if not using react-icons)
```

## Usage

### Images

```typescript
import heroImage from '@/assets/images/hero.jpg'
import logo from '@/assets/images/logo.svg'

<img src={heroImage} alt="Hero" />
```

### Fonts

Add to your CSS file:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

### Icons

```typescript
import { ReactComponent as Icon } from '@/assets/icons/icon.svg'

<Icon className="w-6 h-6" />
```

## Path Alias

The `@/` alias is configured in `tsconfig.json` to point to `src/`, making imports cleaner.
