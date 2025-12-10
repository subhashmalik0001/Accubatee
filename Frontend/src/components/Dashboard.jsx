import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        programs: 1,
        cohorts: 1,
        applications: 0,
        startups: 0,
        sessions: 0,
        courses: 0,
        surveys: 0
    })

    const [recentActivity, setRecentActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New startup application received', time: '2 min ago', read: false },
        { id: 2, message: 'Mentor session reminder', time: '1 hour ago', read: false },
        { id: 3, message: 'Program deadline approaching', time: '3 hours ago', read: false }
    ])
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showTechSupport, setShowTechSupport] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRecentActivity([
                { id: 1, type: 'startup', message: 'New startup "TechFlow" joined the incubator', time: '2 hours ago', status: 'success' },
                { id: 2, type: 'mentor', message: 'Mentor session completed with "InnovateCorp"', time: '4 hours ago', status: 'success' },
                { id: 3, type: 'program', message: 'New program "ScaleUp 2024" launched', time: '1 day ago', status: 'info' },
                { id: 4, type: 'application', message: '5 new applications received', time: '2 days ago', status: 'warning' }
            ])
            setIsLoading(false)
        }, 1000)
    }, [])

    // Custom geometric icons as React components
    const GeometricIcons = {
        Programs: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="3" y="4" width="4" height="4" fill="currentColor" opacity="0.9" />
                <rect x="3" y="10" width="4" height="4" fill="currentColor" opacity="0.7" />
                <rect x="3" y="16" width="4" height="4" fill="currentColor" opacity="0.5" />
                <rect x="9" y="6" width="12" height="2" fill="currentColor" opacity="0.8" />
                <rect x="9" y="12" width="8" height="2" fill="currentColor" opacity="0.6" />
                <rect x="9" y="18" width="10" height="2" fill="currentColor" opacity="0.4" />
            </svg>
        ),
        Cohorts: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.9" />
                <circle cx="16" cy="8" r="3" fill="currentColor" opacity="0.7" />
                <circle cx="8" cy="16" r="3" fill="currentColor" opacity="0.6" />
                <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.4" />
                <path d="M11 11L13 13M11 13L13 11" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            </svg>
        ),
        Applications: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <path d="M6 8h4M6 12h8M6 16h6" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                <circle cx="16" cy="8" r="2" fill="currentColor" opacity="0.9" />
            </svg>
        ),
        Startups: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="currentColor" opacity="0.7" />
                <path d="M12 7L8 10v6l4 2.5 4-2.5v-6l-4-3z" fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
            </svg>
        ),
        Sessions: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" opacity="0.6" />
                <rect x="4" y="8" width="16" height="8" rx="1" fill="currentColor" opacity="0.8" />
                <circle cx="8" cy="12" r="1.5" fill="white" opacity="0.9" />
                <rect x="11" y="10" width="8" height="1" fill="white" opacity="0.7" />
                <rect x="11" y="13" width="6" height="1" fill="white" opacity="0.5" />
            </svg>
        ),
        Courses: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M3 6l9-3 9 3v12l-9 3-9-3V6z" fill="currentColor" opacity="0.6" />
                <path d="M12 3v18M3 6l9 3 9-3" stroke="white" strokeWidth="1.5" opacity="0.8" />
                <circle cx="12" cy="8" r="1" fill="white" opacity="0.9" />
            </svg>
        ),
        Surveys: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="3" y="18" width="3" height="4" fill="currentColor" opacity="0.9" />
                <rect x="8" y="14" width="3" height="8" fill="currentColor" opacity="0.7" />
                <rect x="13" y="10" width="3" height="12" fill="currentColor" opacity="0.5" />
                <rect x="18" y="6" width="3" height="16" fill="currentColor" opacity="0.3" />
                <path d="M4.5 18L9.5 14L14.5 10L19.5 6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            </svg>
        ),
        Analytics: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <path d="M12 4a8 8 0 0 1 8 8" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.9" />
                <path d="M12 4a8 8 0 0 1 5.66 2.34" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
            </svg>
        ),
        Calendar: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" opacity="0.6" />
                <rect x="5" y="8" width="14" height="10" fill="currentColor" opacity="0.8" />
                <circle cx="8" cy="2" r="1" fill="currentColor" opacity="0.9" />
                <circle cx="16" cy="2" r="1" fill="currentColor" opacity="0.9" />
                <rect x="7" y="11" width="2" height="2" fill="white" opacity="0.7" />
                <rect x="11" y="11" width="2" height="2" fill="white" opacity="0.5" />
                <rect x="15" y="11" width="2" height="2" fill="white" opacity="0.3" />
            </svg>
        ),
        Library: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="4" y="4" width="3" height="16" fill="currentColor" opacity="0.9" />
                <rect x="8" y="6" width="3" height="14" fill="currentColor" opacity="0.7" />
                <rect x="12" y="5" width="3" height="15" fill="currentColor" opacity="0.5" />
                <rect x="16" y="7" width="3" height="13" fill="currentColor" opacity="0.3" />
                <rect x="2" y="20" width="20" height="2" fill="currentColor" opacity="0.8" />
            </svg>
        ),
        Support: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                <circle cx="12" cy="8" r="1" fill="white" opacity="0.9" />
                <rect x="11" y="11" width="2" height="6" fill="white" opacity="0.9" />
            </svg>
        ),
        Status: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" opacity="0.6" />
                <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            </svg>
        ),
        Activity: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M2 12h4l2-8 4 16 2-8h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
            </svg>
        ),
        Settings: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="currentColor" opacity="0.6" />
            </svg>
        ),
        Search: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            </svg>
        ),
        Bell: () => (
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="currentColor" opacity="0.7" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            </svg>
        )
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            console.log(`Searching for: ${searchQuery}`)
        }
    }

    const handleNotificationClick = (notificationId) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId
                    ? { ...notif, read: true }
                    : notif
            )
        )
    }

    const handleTabChange = (index) => {
        setSelectedTab(index)
        const tabNames = ['Domain Wise', 'Registration Year Wise', 'Onboarding Year Wise', 'Is Women Led', 'Stage Wise', 'Status Wise']
        console.log(`Switched to ${tabNames[index]} tab`)
    }

    const handleQuickAction = (action) => {
        switch (action) {
            case 'calendar':
                console.log('Opening calendar...')
                break
            case 'library':
                console.log('Opening library...')
                break
            case 'edit':
                console.log('Opening edit mode...')
                break
            case 'view':
                console.log('Opening view mode...')
                break
            default:
                console.log(`Action: ${action}`)
        }
    }

    const handleStatCardClick = (statType) => {
        console.log(`Clicked on ${statType} card. Opening detailed view...`)
    }

    const handleActivityClick = (activity) => {
        console.log(`Activity clicked: ${activity.message}`)
    }

    const handleProfileAction = (action) => {
        switch (action) {
            case 'profile':
                console.log('Opening profile settings...')
                break
            case 'settings':
                console.log('Opening general settings...')
                break
            case 'logout':
                console.log('Logging out...')
                break
            default:
                console.log(`Profile action: ${action}`)
        }
        setShowProfileMenu(false)
    }

    const getActivityIcon = (type) => {
        const iconMap = {
            startup: 'Startups',
            mentor: 'Sessions',
            program: 'Programs',
            application: 'Applications'
        }
        const IconComponent = GeometricIcons[iconMap[type]] || GeometricIcons.Activity
        return <IconComponent />
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animate-reverse"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                                </div>
                                <span className="text-xl font-bold text-gray-900">CU-TBI</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-80 h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
                                    <GeometricIcons.Search />
                                </div>
                            </form>

                            <button
                                onClick={() => console.log('Settings')}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-5 h-5">
                                    <GeometricIcons.Settings />
                                </div>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
                                >
                                    <div className="w-5 h-5">
                                        <GeometricIcons.Bell />
                                    </div>
                                    {notifications.filter(n => !n.read).length > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                            {notifications.filter(n => !n.read).length}
                                        </div>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map(notification => (
                                                <div
                                                    key={notification.id}
                                                    onClick={() => handleNotificationClick(notification.id)}
                                                    className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                                                >
                                                    <p className="text-sm text-gray-900">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-semibold text-sm hover:bg-gray-800 transition-colors overflow-hidden"
                                >
                                    {user && user.picture ? (
                                        <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user ? (user.given_name ? user.given_name[0] : 'U') : 'YT'
                                    )}
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="p-3 border-b border-gray-100">
                                            <p className="font-semibold text-gray-900">{user ? user.name : 'Yash Tyagi'}</p>
                                            <p className="text-sm text-gray-500">{user ? user.email : 'Administrator'}</p>
                                        </div>
                                        <div className="py-2">
                                            <button
                                                onClick={() => handleProfileAction('profile')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Profile Settings
                                            </button>
                                            <button
                                                onClick={() => handleProfileAction('settings')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                General Settings
                                            </button>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={() => handleProfileAction('logout')}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Banner */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
                        <div className="relative">
                            <h1 className="text-3xl font-bold mb-2">Welcome back, {user ? user.given_name || user.name : 'User'}</h1>
                            <p className="text-blue-100 opacity-90">Managing your incubator ecosystem</p>
                            <div className="flex items-center mt-4 text-blue-200">
                                <div className="w-4 h-4 mr-2">
                                    <GeometricIcons.Status />
                                </div>
                                <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-8 w-16 h-16 text-white/20">
                            <GeometricIcons.Startups />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    {[
                        { key: 'programs', label: 'Programs', value: stats.programs, icon: 'Programs', color: 'from-blue-600 to-blue-700' },
                        { key: 'cohorts', label: 'Cohorts', value: stats.cohorts, icon: 'Cohorts', color: 'from-green-600 to-green-700' },
                        { key: 'applications', label: 'Applications', value: stats.applications, icon: 'Applications', color: 'from-purple-600 to-purple-700' },
                        { key: 'startups', label: 'Startups', value: stats.startups, icon: 'Startups', color: 'from-orange-600 to-orange-700' },
                        { key: 'sessions', label: 'Sessions', value: stats.sessions, icon: 'Sessions', color: 'from-indigo-600 to-indigo-700' },
                        { key: 'courses', label: 'Courses', value: stats.courses, icon: 'Courses', color: 'from-pink-600 to-pink-700' },
                        { key: 'surveys', label: 'Surveys', value: stats.surveys, icon: 'Surveys', color: 'from-teal-600 to-teal-700' }
                    ].map((stat) => {
                        const IconComponent = GeometricIcons[stat.icon]
                        return (
                            <button
                                key={stat.key}
                                onClick={() => handleStatCardClick(stat.key)}
                                className={`group bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-left`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-8 h-8 text-white/80 group-hover:text-white transition-colors">
                                        <IconComponent />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                </div>
                                <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{stat.label}</p>
                            </button>
                        )
                    })}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Programs Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <GeometricIcons.Programs />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Programs</h2>
                                </div>
                                <button
                                    onClick={() => handleQuickAction('view')}
                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    View All →
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">CU-TBI | Startup Onboarding Program | General</h3>
                                        <p className="text-gray-600 text-sm">Comprehensive startup development program</p>
                                    </div>
                                    <button
                                        onClick={() => handleQuickAction('edit')}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <div className="w-4 h-4">
                                            <GeometricIcons.Settings />
                                        </div>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {[
                                        { label: 'Cohort', value: 'CU-TBI | General 2025', icon: 'Cohorts' },
                                        { label: 'Applications', value: stats.applications, icon: 'Applications' },
                                        { label: 'Startups', value: stats.startups, icon: 'Startups' },
                                        { label: 'Total', value: stats.applications + stats.startups, icon: 'Analytics' }
                                    ].map((item, index) => {
                                        const IconComponent = GeometricIcons[item.icon]
                                        return (
                                            <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors" onClick={() => console.log(`${item.label} details clicked`)}>
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <div className="w-5 h-5 text-gray-400">
                                                        <IconComponent />
                                                    </div>
                                                    <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleQuickAction('view')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                    >
                                        View Program
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction('edit')}
                                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                    >
                                        Change Program
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Analytics Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                        <GeometricIcons.Analytics />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Startup Analytics</h2>
                                </div>
                                <button
                                    onClick={() => handleQuickAction('view')}
                                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                >
                                    View All →
                                </button>
                            </div>

                            {/* Tab Navigation */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg">
                                    {['Domain', 'Reg Year', 'Onboard Year', 'Women Led', 'Stage', 'Status'].map((tab, index) => (
                                        <button
                                            key={tab}
                                            onClick={() => handleTabChange(index)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === index
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <div className="w-16 h-16 mx-auto mb-4 text-gray-300" onClick={() => console.log('Analytics chart clicked')}>
                                    <GeometricIcons.Analytics />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                                <p className="text-gray-500 text-sm mb-4">Start by importing your startup data</p>
                                <button
                                    onClick={() => console.log('Adding new startup data...')}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Import Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <GeometricIcons.Activity />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleQuickAction('calendar')}
                                    className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <GeometricIcons.Calendar />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Calendar</p>
                                        <p className="text-sm text-gray-500">View schedules</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleQuickAction('library')}
                                    className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                        <GeometricIcons.Library />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Library</p>
                                        <p className="text-sm text-gray-500">Resource center</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                        <GeometricIcons.Support />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Support</h3>
                                </div>
                                <button
                                    onClick={() => setShowTechSupport(!showTechSupport)}
                                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                >
                                    {showTechSupport ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {showTechSupport ? (
                                <div className="space-y-3">
                                    <div className="text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                        Contact our support team for assistance
                                    </div>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                                        Email Support
                                    </button>
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                                        Live Chat
                                    </button>
                                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                                        Phone Support
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
                                    <p className="text-indigo-700 font-medium text-sm">24/7 Support Available</p>
                                    <div className="w-6 h-6 mx-auto mt-2 text-indigo-600">
                                        <GeometricIcons.Status />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* System Status */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <GeometricIcons.Status />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <p className="text-green-800 font-medium text-sm">All systems operational</p>
                                </div>
                                <p className="text-green-600 text-sm mb-3">No issues detected</p>
                                <button
                                    onClick={() => console.log('Checking system status...')}
                                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                                >
                                    View Details →
                                </button>
                            </div>
                        </div>

                        {/* Upcoming Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                        <GeometricIcons.Calendar />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
                                </div>
                                <button
                                    onClick={() => handleQuickAction('calendar')}
                                    className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                                >
                                    Calendar →
                                </button>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg text-center">
                                <div className="w-12 h-12 mx-auto mb-3 text-gray-300">
                                    <GeometricIcons.Calendar />
                                </div>
                                <p className="text-gray-600 text-sm mb-3">No upcoming events</p>
                                <button
                                    onClick={() => console.log('Opening calendar to schedule meeting...')}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Schedule Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600">
                                <GeometricIcons.Activity />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                        </div>
                        <button
                            onClick={() => console.log('Refreshing activity feed...')}
                            className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                        >
                            Refresh
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                onClick={() => handleActivityClick(activity)}
                                className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                            >
                                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'warning' ? 'bg-yellow-500' : activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium">{activity.message}</p>
                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        console.log(`More options for: ${activity.message}`)
                                    }}
                                    className="w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <div className="w-4 h-4">
                                        <GeometricIcons.Settings />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => console.log('Loading more activities...')}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium text-sm transition-colors"
                        >
                            Load More
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>System: Online</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span>Updated: {new Date().toLocaleString()}</span>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <button
                                onClick={() => console.log('Refreshing data...')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard