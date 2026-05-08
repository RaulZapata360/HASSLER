# Skill: Shadboard - Next.js 15 & Shadcn/UI Admin Dashboard

## Descripción

Shadboard es una plantilla de dashboard administrativa de código abierto construida con Next.js 15 y componentes Shadcn/UI. Es escalable, accessible y lista para producción.

## Tech Stack

- **React 19** - Framework UI moderno
- **Next.js 15** - App Router, SSR, SEO
- **Shadcn/UI** - Componentes base en Radix UI
- **Tailwind CSS 4** - Estilos utility-first
- **NextAuth.js** - Autenticación
- **Zod** - Validación de esquemas
- **React Hook Form** - Manejo de formularios
- **Recharts** - Gráficos y visualización de datos
- **TanStack Table** - Tablas avanzadas
- **FullCalendar** - Calendario
- **Lucide Icons** - Iconos

## Estructura del Proyecto

```
shadboard/
├── starter-kit/           # Versión minimal para empezar
├── full-kit/              # Versión completa con todo
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/
│   │   ├── ui/            # Componentes Shadcn
│   │   ├── dashboard/     # Componentes del dashboard
│   │   └── layouts/       # Layouts (Sidebar, Header)
│   ├── lib/               # Utilidades
│   └── hooks/             # Custom hooks
```

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Qualiora/shadboard.git
cd shadboard

# Instalar dependencias (usa pnpm)
npm install -g pnpm
pnpm install

# Iniciar desarrollo
pnpm dev
```

## Apps y Páginas Incluidas

### Aplicaciones
- **Email** - Cliente de correo
- **Chat** - Mensajería en tiempo real
- **Calendar** - Calendario con eventos
- **Kanban** - Tablero de tareas drag & drop

### Páginas
- **Dashboard** - Vista principal con métricas
- **Pricing** - Planes de precios
- **Payment** - Procesamiento de pagos
- **Settings** - Configuración (General, Security, Billing, Notifications)
- **Auth** - Login, Register, Forgot Password, Verify Email
- **Utility** - 404, 401, Coming Soon, Maintenance

## Componentes Principales

### Sidebar Navigation

```tsx
import { Sidebar } from '@/components/layouts/Sidebar'

<Sidebar 
  items={[
    { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { title: 'Email', icon: Mail, href: '/apps/email' },
    { title: 'Chat', icon: MessageSquare, href: '/apps/chat' },
    { title: 'Calendar', icon: Calendar, href: '/apps/calendar' },
    { title: 'Kanban', icon: Columns, href: '/apps/kanban' },
  ]}
/>
```

### Cards con Métricas

```tsx
import { StatCard } from '@/components/dashboard/StatCard'

<StatCard 
  title="Total Revenue"
  value="$45,231.89"
  change="+20.1%"
  trend="up"
  icon={DollarSign}
/>
```

### Data Tables con TanStack

```tsx
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

<DataTable 
  columns={columns} 
  data={data}
  searchKey="name"
  filters={[
    { key: 'status', options: ['Active', 'Inactive'] }
  ]}
/>
```

### Gráficos con Recharts

```tsx
import { RevenueChart } from '@/components/charts/RevenueChart'

<RevenueChart 
  data={revenueData}
  xKey="month"
  yKey="revenue"
/>
```

## Autenticación con NextAuth

```tsx
// src/lib/auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // Lógica de autenticación
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role
      return session
    }
  }
})
```

## Theme Customization

```bash
# Personalizar colores
# Editar tailwind.config.ts

theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3B82F6',
        foreground: '#FFFFFF'
      },
      background: '#0F172A',
      foreground: '#F8FAFC'
    }
  }
}
```

## Agregar Componentes Shadcn

```bash
# Agregar nuevos componentes
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add calendar
```

## Dark Mode

```tsx
// Usar el tema
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

## Rutas Protegidas

```tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return <div>Contenido protegido</div>
}
```

## Formularios con React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('email')} />
      <Input {...form.register('password')} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Notas

- Requiere Node.js 20+
- Usar pnpm como package manager
- Soporta I18n integrado
- Totalmente responsive
- Documentación completa: https://shadboard.vercel.app/docs
- Demo: https://shadboard.vercel.app/