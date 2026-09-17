import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { App } from './App';
import favicon from '../../recursos-compartidos/assets/marca/favicon.png';
import '../../recursos-compartidos/estilos/base.css';
import './app.css';

document.querySelector<HTMLLinkElement>('link[rel="icon"]')!.href = favicon;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
