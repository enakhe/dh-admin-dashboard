import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/imgs/logo.png';

const Header: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/newcomers', label: 'Newcomers' },
        { path: '/mentors', label: 'Mentors' },
        { path: '/analytics', label: 'Analytics' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-[#fff] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="Dominion House Logo"
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover bg-white"
                            />
                            <span className="text-sm md:text-xl font-semibold hidden sm:block">
                                Dominion House Legacy Center Admin Dashboard
                            </span>
                            <span className="text-sm font-semibold sm:hidden">
                                Dominion House
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
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

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 text-black rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === item.path
                                        ? 'bg-gray-100'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
