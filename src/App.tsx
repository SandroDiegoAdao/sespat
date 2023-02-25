import './locales/i18n';

import 'simplebar-react/dist/simplebar.min.css';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import './utils/mapboxgl';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-quill/dist/quill.snow.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'react-lazy-load-image-component/src/effects/blur.css';

import brLocale from 'date-fns/locale/pt-BR';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, persistor } from './redux/store';
import Router from './routes';
import ThemeProvider from './theme';
import ThemeLocalization from './locales';
import { StyledChart } from './components/chart';
import SnackbarProvider from './components/snackbar';
import ScrollToTop from './components/scroll-to-top';
import { MotionLazyContainer } from './components/animate';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { AuthProvider } from './auth/JwtContext';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <SettingsProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <MotionLazyContainer>
                      <ThemeProvider>
                        <ThemeSettings>
                          <ThemeLocalization>
                            <SnackbarProvider>
                              <StyledChart />
                              <Router />
                            </SnackbarProvider>
                          </ThemeLocalization>
                        </ThemeSettings>
                      </ThemeProvider>
                    </MotionLazyContainer>
                  </BrowserRouter>
                </SettingsProvider>
              </LocalizationProvider>
            </PersistGate>
          </ReduxProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
