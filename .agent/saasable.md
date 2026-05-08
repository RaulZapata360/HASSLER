# Skill: SaasAble - React Material UI + Tailwind Admin Dashboard

## Descripción

**SaasAble** es una solución completa para construir productos SaaS y no-SaaS. Incluye tanto UI kit como dashboard administrativo. Disponible en React + Material UI y Tailwind CSS. Ideal para SaaS, agencias, CRMs, blogs, AI platforms, y más.

## Versiones Disponibles

| Producto | Free | Pro |
|----------|------|-----|
| Admin React | 9 pages | 45+ pages |
| Admin Tailwind | ✓ | ✓ |
| UI Kit React | 25 blocks | 200+ blocks |
| UI Kit Tailwind | 25 blocks | 200+ blocks |

## Tech Stack

- **React 19** - UI Framework
- **Next.js 16** - Full-stack framework
- **Vite** - Build tool alternativo
- **TypeScript** - Type safety
- **Material UI v7** - Componentes (versión React)
- **Tailwind CSS** - Estilos (versión Tailwind)
- **Material 3** - Design system
- **Figma** - Archivos de diseño disponibles

## Estructura del Proyecto

```
saasable-ui/
├── admin/                    # Dashboard Admin
│   ├── react/               # Versión React + MUI
│   ├── tailwind/            # Versión Tailwind
│   └── vite/                # Versión Vite
├── uikit/                   # UI Kit (componentes)
│   ├── admin/              # Componentes para admin
│   ├── react/              # Versión React
│   └── tailwind/           # Versión Tailwind
└── tailwind/               # Tailwind puro HTML
```

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/phoenixcoded/saasable-ui.git
cd saasable-ui

# Admin React + MUI
cd admin/react
npm install
npm run dev

# Admin Vite
cd admin/vite
npm install
npm run start

# Admin Tailwind
cd admin/tailwind
npm install
gulp  # Serve
```

## Démos

| Producto | URL |
|----------|-----|
| Admin Free | https://free.admin.saasable.io/ |
| Admin Pro | https://admin.saasable.io/ |
| UI Kit React Free | https://free.saasable.io/ |
| UI Kit React Pro | https://saasable.io/ |
| UI Kit Tailwind Free | https://tailwind.saasable.io/free |
| UI Kit Tailwind Pro | https://tailwind.saasable.io/ |

## Componentes MUI (React)

```tsx
// Botón MUI
import { Button, Box, Card, CardContent, Grid, Avatar, Typography } from '@mui/material'

<Button variant="contained" color="primary">
  Primary Button
</Button>

<Button variant="outlined" color="secondary">
  Secondary
</Button>

<Button variant="text">
  Text Button
</Button>

// Card con imagen
<Card sx={{ maxWidth: 345 }}>
  <CardMedia component="img" height="140" image="/img.jpg" />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Description
    </Typography>
  </CardContent>
</Card>

// Grid responsive
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Card>...</Card>
  </Grid>
</Grid>
```

## Dashboard Layout (React)

```tsx
import { 
  Box, Drawer, AppBar, Toolbar, List, 
  ListItem, ListItemIcon, ListItemText, 
  Typography, IconButton 
} from '@mui/material'
import { 
  Dashboard, People, ShoppingCart, 
  Settings, Menu as MenuIcon 
} from '@mui/icons-material'

const drawerWidth = 240

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Admin</Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Content */}
      </Box>
    </Box>
  )
}
```

## Dark Mode

```tsx
// Theme provider
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    secondary: { main: '#8b5cf6' }
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <DashboardLayout />
    </ThemeProvider>
  )
}
```

## Componentes Tailwind (HTML/Custom)

```html
<!-- Botón primary -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Primary
</button>

<!-- Card -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="text-gray-600">Description</p>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="col-span-1">Content</div>
</div>

<!-- Sidebar -->
<aside class="w-64 bg-gray-800 text-white min-h-screen">
  <nav>
    <a href="#" class="block py-3 px-4 hover:bg-gray-700">Dashboard</a>
    <a href="#" class="block py-3 px-4 hover:bg-gray-700">Users</a>
  </nav>
</aside>
```

## Características Pro

| Feature | Free | Pro |
|---------|------|-----|
| Demo Pages | 9 | 45+ |
| Component Blocks | 25 | 200+ |
| Dark/Light Mode | ✓ | ✓ |
| TypeScript | - | ✓ |
| Figma Files | - | ✓ |
| RTL Support | - | ✓ |
| Multi-language | - | ✓ |
| Role-based Auth | - | ✓ |
| Supabase/AWS Auth | - | ✓ |

## Auth con Supabase (Pro)

```tsx
// Ejemplo de autenticación
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function signIn(email: string, password: string) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { user, error }
}
```

## Deploy a Vercel

```bash
# Deploy automático
vercel deploy --prod

# O usar el botón en el repo
# https://vercel.com/new/clone?repository-url=...
```

## Documentación

- **SaasAble**: https://phoenixcoded.gitbook.io/saasable
- **SaasAble Tailwind**: https://phoenixcoded.gitbook.io/saasable-tailwind

## Más Productos de PhoenixCoded

| Dashboard | Free | Pro |
|-----------|------|-----|
| Able Pro | [Free](https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template) | [Pro](https://1.envato.market/EKD9M4) |

## Notas

- Actualizado a 2026 (v2.1.0)
- MUI v7 con Material Design 3
- Soporta RTL para idiomas right-to-left
- Excelente para productos SaaS
- Versión Pro disponible en MUI Store