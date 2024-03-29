import { RootProvider } from '@tradein-admin/libs';
import { StrictMode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as ReactDOM from 'react-dom/client';
import './global.css';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>,
);
