import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'
function Navigation() {
    const location = useLocation()
    const { user, logout } = useAuth()

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/startups', label: 'Startups', icon: '🚀' },
        { path: '/mentors', label: 'Mentors', icon: '🧑‍🏫' },
        { path: '/programs', label: 'Programs', icon: '📦' },
        { path: '/applications', label: 'Applications', icon: '🗂️' },
        { path: '/funding', label: 'Funding', icon: '📈' },
        { path: '/tools', label: 'Tools', icon: '🛠️' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ]

    return (
        <nav className="bg-white shadow-lg border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-800">Accubate</h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors ml-4"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-4"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ml-2"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation