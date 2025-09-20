import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/imgs/logo.png';

const Header: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/newcomers', label: 'Newcomers' },
        { path: '/mentors', label: 'Mentors' },
        { path: '/analytics', label: 'Analytics' },
    ];

    return (
        <header className="bg-[#fff] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="Dominion House Logo"
                                className="w-16 h-16 rounded-full object-cover bg-white"
                            />
                            <span className="text-xl font-semibold">Dominion House Legacy Center Admin Dashboard</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 text-black rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === item.path
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
