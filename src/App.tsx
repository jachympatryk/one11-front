import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/landing.page';
import { AppPage } from './pages/app/app.page';
import { PageRoute } from './components/page/page-route.tsx';

function App() {
    return (
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
    );
}

export default App;
