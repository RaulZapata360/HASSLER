# Skill: Admin One - React Tailwind 4.x Admin Dashboard

## Descripción

**Admin One** es una plantilla de dashboard administrativa gratuita y de código abierto construida con React, Next.js, TypeScript y Tailwind CSS 4.x. Es rápida, hermosa y muy ligera (~38kb CSS producción).

## Características

- **Tailwind CSS 4** - Utility-first styling
- **Dark Mode** - Soporte completo para tema oscuro
- **TypeScript** - Type safety completo
- **React Redux** - Estado global
- **Next.js App Router** - Server-side rendering
- **≈38kb** - CSS de producción ultra-ligero
- **MIT License** - Libre para usar

## Tech Stack

- React 19
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- Lucide Icons

## Estructura del Proyecto

```
admin-one/
├── app/
│   ├── (root)/           # Páginas principales
│   │   ├── dashboard/
│   │   ├── form/
│   │   ├── table/
│   │   └── ui/
│   ├── (auth)/           # Páginas de autenticación
│   │   ├── login/
│   │   └── register/
│   └── layout.tsx        # Root layout
├── css/
│   └── globals.css       # Tailwind + theme
├── components/
│   ├── ui/               # Componentes base
│   ├── layout/           # Sidebar, Header
│   └── charts/           # Gráficos
└── lib/
    └── store/            # Redux store
```

## Instalación

```bash
# Opción 1: Crear desde template
# https://github.com/justboil/admin-one-react-tailwind/generate

# Opción 2: Clonar
git clone https://github.com/justboil/admin-one-react-tailwind.git
cd admin-one-react-tailwind

# Instalar
npm install

# Desarrollo
npm run dev

# Producción
npm run build
```

## Layout Principal

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Componentes UI

### Cards

```tsx
// Componente Card básico
<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div className="p-6 flex flex-col space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-semibold tracking-tight">
        Total Revenue
      </h3>
      <span className="text-green-500 text-sm">+12.5%</span>
    </div>
    <p className="text-3xl font-bold">$45,231.89</p>
  </div>
</div>
```

### Tables

```tsx
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Price</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Product 1</TableCell>
        <TableCell>Active</TableCell>
        <TableCell>$99.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

### Buttons

```tsx
import { Button } from '@/components/ui/button'
import { Plus, Download, Settings } from 'lucide-react'

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Product
</Button>

<Button variant="outline">
  <Download className="mr-2 h-4 w-4" />
  Export
</Button>

<Button variant="ghost">
  <Settings className="h-4 w-4" />
</Button>
```

## Dark Mode

```tsx
// Theme toggle component
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

## Tailwind CSS 4 Configuración

```css
/* css/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## Responsive Design

```css
/* Breakpoints */

/* Mobile (<640px) - Menú oculto, diseño apilado */
@media (max-width: 640px) {
  .sidebar { display: none; }
}

/* Tablet (640px-1024px) - Sidebar colapsable */
@media (min-width: 640px) and (max-width: 1024px) {
  .sidebar-collapsed .sidebar { width: 64px; }
}

/* Desktop (>1024px) - Layout completo */
@media (min-width: 1024px) {
  .sidebar { width: 280px; }
}
```

## Iconos (Lucide)

```tsx
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react'

// Usar en botones
<Button><ShoppingCart className="mr-2 h-4 w-4" /> Orders</Button>
```

## Redux Store

```tsx
// lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

## Build y Deploy

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Lint
npm run lint

# Format
npm run format

# Static export (para hosting estático)
IS_OUTPUT_EXPORT=true npm run build
```

## Demo

- **Free Dashboard**: https://justboil.github.io/admin-one-react-tailwind/
- **Premium**: Coming soon

## Notas

- Producción CSS ≈38kb (muy ligero)
- Soporta todos los navegadores modernos
-Theme provider integrado con next-themes
- MIT License - libre para uso comercial
- Excelente para proyectos que necesitan dashboard liviano