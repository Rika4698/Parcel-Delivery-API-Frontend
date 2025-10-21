import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme/ThemeProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './routes/index.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
   
    </ThemeProvider>
  
  </StrictMode>
);