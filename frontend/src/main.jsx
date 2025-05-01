// import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/notifications/styles.css';
// import '@mantine/tiptap/styles.css';
import 'fastapi-rtk/dist/style.css';

import { MantineProvider } from '@mantine/core';
import { Provider } from 'fastapi-rtk';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BASE_PATH } from './constants';
import './index.css';
import store from './state/store.js';
import theme from './theme.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename={BASE_PATH}>
        <MantineProvider theme={theme}>
          <Provider baseUrl={BASE_PATH + 'api/v1'}>
            <App />
          </Provider>
        </MantineProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);
