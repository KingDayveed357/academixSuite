import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'
import { ThemeProvider } from './context/ThemeContext'
import { MockSessionProvider } from './app/providers/MockSessionProvider'

import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
  title: title => `${title} - AcademixSuite`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    console.log('Setting up Inertia app on element:', el);
    createRoot(el).render(
      <ThemeProvider>
        <MockSessionProvider>
          <App {...props} />
        </MockSessionProvider>
      </ThemeProvider>
    );
  },
});


