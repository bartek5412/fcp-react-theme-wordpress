# FCP Landing Page

Statyczna strona React/Vite przygotowana pod deploy w Coolify przez Nixpacks.

## Skrypty

```bash
npm run dev
npm run build
npm run start
```

## Deploy w Coolify

- Build Pack: `Nixpacks`
- Port: aplikacja nasluchuje na `PORT`
- Build i start sa pobierane z `nixpacks.toml`

## Jak to dziala

- `npm run build` tworzy statyczny build w `dist/`
- `npm run start` uruchamia prosty serwer Node serwujacy `dist/`
- fallback dla tras kieruje na `index.html`
