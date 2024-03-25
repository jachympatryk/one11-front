import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/landing.page';
import { AppPage } from './pages/app/app.page';
import { PageRoute } from './components/page/page-route.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

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
                        element={<PageRoute element={<AppPage />} />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
