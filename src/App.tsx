import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/landing.page';
import { PageRoute } from './components/page/page-route.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthPage } from './pages/auth/auth.page.tsx';
import { AppWrapper } from './pages/app/app.context.tsx';
import { Dashboard } from './pages/app/pages/dashboard/dashboard.tsx';
import { Calendar } from './pages/app/pages/calendar/calendar.tsx';
import { Players } from './pages/app/pages/players/players.tsx';
import { Event } from './pages/app/pages/event/event.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageRoute element={<LandingPage />} />} />
          <Route path="/app" element={<AppWrapper />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="players" element={<Players />} />
            <Route path="event/:eventId" element={<Event />} />
          </Route>

          <Route path="/auth" element={<PageRoute element={<AuthPage />} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
