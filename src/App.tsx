import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/landing.page';
import { PageRoute } from './components/page/page-route.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthPage } from './pages/auth/auth.page.tsx';
import { AppWrapper } from './pages/app/app.context.tsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<PageRoute element={<LandingPage />} />}
                    />
                    <Route
                        path="/app"
                        element={<PageRoute element={<AppWrapper />} />}
                    />
                    <Route
                        path="/auth"
                        element={<PageRoute element={<AuthPage />} />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
