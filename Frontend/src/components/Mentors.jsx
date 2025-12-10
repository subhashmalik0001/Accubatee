import React, { useState, useEffect } from 'react'

function Mentors() {
    const [activeTab, setActiveTab] = useState('Relationships')
    const [activeFilter, setActiveFilter] = useState('All')
    const [mentoringData, setMentoringData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showAddMeeting, setShowAddMeeting] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedMentoring, setSelectedMentoring] = useState(null)
    const [showBulkActions, setShowBulkActions] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])

    // Mock data for demonstration
    const [mockData, setMockData] = useState({
        relationships: [
            {
                id: 1,
                mentor: 'Dr. Sarah Johnson',
                mentee: 'TechFlow Solutions',
                status: 'Ongoing',
                startDate: '2025-01-15',
                nextMeeting: '2025-02-20',
                progress: 75,
                category: 'Technology',
                lastActivity: '2 days ago',
                meetings: 8,
                feedback: 4.8
            },
            {
                id: 2,
                mentor: 'Prof. Michael Chen',
                mentee: 'GreenEnergy Inc',
                status: 'Completed',
                startDate: '2024-09-01',
                nextMeeting: '2025-01-30',
                progress: 100,
                category: 'Sustainability',
                lastActivity: '1 week ago',
                meetings: 12,
                feedback: 4.9
            }
        ],
        meetings: [
            {
                id: 1,
                title: 'Q1 Strategy Review',
                mentor: 'Dr. Sarah Johnson',
                mentee: 'TechFlow Solutions',
                date: '2025-02-20',
                time: '10:00 AM',
                duration: '60 min',
                status: 'Scheduled',
                type: 'Strategy'
            }
        ],
        mentors: [
            {
                id: 1,
                name: 'Dr. Sarah Johnson',
                expertise: 'Technology & AI',
                experience: '15+ years',
                rating: 4.8,
                activeMentees: 3,
                availability: 'Available',
                specialization: ['AI/ML', 'Product Strategy', 'Scaling']
            }
        ],
        mentees: [
            {
                id: 1,
                name: 'TechFlow Solutions',
                industry: 'Technology',
                stage: 'Series A',
                progress: 75,
                lastActivity: '2 days ago',
                nextMilestone: 'Product Launch'
            }
        ]
    })

    const tabs = [
        { id: 'Relationships', label: 'Relationships', count: mockData.relationships.length },
        { id: 'Meetings', label: 'Meetings', count: mockData.meetings.length },
        { id: 'Mentors', label: 'Mentors', count: mockData.mentors.length },
        { id: 'Mentees', label: 'Mentees', count: mockData.mentees.length },
        { id: 'Feedbacks', label: 'Feedbacks', count: 12 },
        { id: 'Analytics', label: 'Analytics', count: '' },
        { id: 'Requests', label: 'Requests', count: 3 }
    ]

    const filters = [
        { id: 'All', count: mockData.relationships.length },
        { id: 'Ongoing', count: mockData.relationships.filter(r => r.status === 'Ongoing').length },
        { id: 'Cancelled', count: 0 },
        { id: 'Completed', count: mockData.relationships.filter(r => r.status === 'Completed').length }
    ]

    // Custom geometric icons
    const Icons = {
        Settings: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 1 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="currentColor" opacity="0.6" />
            </svg>
        ),
        Calendar: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" opacity="0.6" />
                <rect x="5" y="8" width="14" height="10" fill="currentColor" opacity="0.8" />
                <circle cx="8" cy="2" r="1" fill="currentColor" opacity="0.9" />
                <circle cx="16" cy="2" r="1" fill="currentColor" opacity="0.9" />
            </svg>
        ),
        Filter: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" fill="currentColor" opacity="0.7" />
            </svg>
        ),
        Refresh: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M1 4v6h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <path d="M23 20v-6h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </svg>
        ),
        Plus: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </svg>
        ),
        Search: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            </svg>
        ),
        Folder: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="currentColor" opacity="0.6" />
            </svg>
        ),
        Edit: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </svg>
        ),
        Analytics: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M3 3v18h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
        ),
        Users: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </svg>
        ),
        Message: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </svg>
        ),
        Clock: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            </svg>
        ),
        Star: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" opacity="0.8" />
            </svg>
        ),
        CheckCircle: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                <polyline points="22,4 12,14.01 9,11.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
        ),
        AlertCircle: () => (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </svg>
        )
    }

    const renderRelationshipsTab = () => (
        <div className="space-y-6">
            {/* Search and Actions Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Icons.Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search relationships..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                        />
                    </div>
                    <button
                        onClick={() => setShowBulkActions(!showBulkActions)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                        Bulk Actions
                    </button>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Icons.Plus />
                        <span>New Relationship</span>
                    </button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Icons.Analytics />
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>

            {/* Bulk Actions */}
            {showBulkActions && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-800 font-medium">Bulk Actions ({selectedItems.length} selected)</span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Select All</button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                                Schedule Meeting
                            </button>
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors">
                                Send Reminder
                            </button>
                            <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm transition-colors">
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Relationships Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockData.relationships.map((relationship) => (
                    <div key={relationship.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{relationship.mentor}</h3>
                                <p className="text-sm text-gray-600 mb-2">{relationship.mentee}</p>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${relationship.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                                            relationship.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {relationship.status}
                                    </span>
                                    <span className="text-xs text-gray-500">{relationship.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Icons.Edit />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Icons.Message />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium text-gray-900">{relationship.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${relationship.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                            <div>
                                <span className="text-gray-500">Next Meeting</span>
                                <p className="font-medium text-gray-900">{relationship.nextMeeting}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Meetings</span>
                                <p className="font-medium text-gray-900">{relationship.meetings}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                <Icons.Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-900">{relationship.feedback}</span>
                            </div>
                            <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {mockData.relationships.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
                        <Icons.Folder />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No mentoring relationships</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first mentoring relationship</p>
                    <div className="flex items-center justify-center space-x-3">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            Create Relationship
                        </button>
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                            Import Data
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

    const renderMeetingsTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Icons.Plus />
                    <span>Schedule Meeting</span>
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <Icons.Calendar />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
                    <p className="text-gray-500">Schedule your first mentoring session</p>
                </div>
            </div>
        </div>
    )

    const renderMentorsTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Mentor Directory</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Add Mentor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockData.mentors.map((mentor) => (
                    <div key={mentor.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">{mentor.name.charAt(0)}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.expertise}</p>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Experience</span>
                                <span className="font-medium">{mentor.experience}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Rating</span>
                                <div className="flex items-center space-x-1">
                                    <Icons.Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-medium">{mentor.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Active Mentees</span>
                                <span className="font-medium">{mentor.activeMentees}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${mentor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {mentor.availability}
                            </span>
                            <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderMenteesTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Mentee Companies</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Add Mentee
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockData.mentees.map((mentee) => (
                    <div key={mentee.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <span className="text-2xl font-bold text-green-600">{mentee.name.charAt(0)}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">{mentee.name}</h3>
                            <p className="text-sm text-gray-600">{mentee.industry}</p>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Stage</span>
                                <span className="font-medium">{mentee.stage}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{mentee.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${mentee.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Next: {mentee.nextMilestone}</span>
                            <button className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderFeedbacksTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Feedback & Reviews</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Request Feedback
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <Icons.Message />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback available</h3>
                    <p className="text-gray-500">Start collecting feedback from your mentoring sessions</p>
                </div>
            </div>
        </div>
    )

    const renderAnalyticsTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Relationships</p>
                            <p className="text-2xl font-bold text-gray-900">{mockData.relationships.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icons.Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">{mockData.relationships.filter(r => r.status === 'Ongoing').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Avg. Rating</p>
                            <p className="text-2xl font-bold text-gray-900">4.8</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Icons.Star className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <Icons.Analytics />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-500">Comprehensive insights and metrics coming soon</p>
                </div>
            </div>
        </div>
    )

    const renderRequestsTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Process All
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <Icons.AlertCircle />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-gray-500">All requests have been processed</p>
                </div>
            </div>
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Relationships':
                return renderRelationshipsTab()
            case 'Meetings':
                return renderMeetingsTab()
            case 'Mentors':
                return renderMentorsTab()
            case 'Mentees':
                return renderMenteesTab()
            case 'Feedbacks':
                return renderFeedbacksTab()
            case 'Analytics':
                return renderAnalyticsTab()
            case 'Requests':
                return renderRequestsTab()
            default:
                return renderRelationshipsTab()
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    CU-TBI | Startup Onboarding Program | General 2025 Applications
                                </h1>
                                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                                    <Icons.Edit className="w-4 h-4" />
                                    <span>Change Pipeline</span>
                                </button>
                            </div>
                        </div>

                        {/* Primary Navigation */}
                        <div className="flex items-center space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="flex items-center space-x-2">
                                        <span>{tab.label}</span>
                                        {tab.count !== '' && (
                                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                                {tab.count}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Secondary Action Bar */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Icons.Settings />
                                    <span>Settings</span>
                                </button>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setShowAddMeeting(!showAddMeeting)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    <Icons.Calendar />
                                    <span>Add a One-Time Meeting</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Icons.Filter />
                            <span className="font-medium">Filters</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === filter.id
                                            ? 'bg-yellow-400 text-yellow-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="flex items-center space-x-2">
                                        <span>{filter.id}</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                            {filter.count}
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Icons.Refresh />
                        <span>Reset</span>
                    </button>
                </div>

                {/* Tab Content */}
                {renderTabContent()}
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Copyright © 2025 Cunomial. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Feedback</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Terms of use</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Mentors


