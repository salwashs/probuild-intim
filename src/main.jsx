import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://98cb1e333bd8c24d0e7707e8d5a86e39@o4507614563074048.ingest.us.sentry.io/4511167768952832',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  sendDefaultPii: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Oops! Telah terjadi kesalahan sistem.</h2>
        <p>Tim engineer kami telah mendapatkan notifikasi terkait error ini secara real-time.</p>
        <button onClick={() => window.location.reload()} style={{ padding: '0.6rem 1.2rem', marginTop: '1rem', cursor: 'pointer', background: '#e8303a', color: 'white', border: 'none', borderRadius: '4px' }}>Muat Ulang Halaman</button>
      </div>
    }>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
