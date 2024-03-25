import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {/* eslint-disable-next-line react/react-in-jsx-scope */}
                    <Link to="/app">App</Link>
                </li>
            </ul>
        </nav>
    );
};
