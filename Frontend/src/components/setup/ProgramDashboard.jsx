import React, { useState } from 'react'
import {
    ArrowLeft, LayoutDashboard, Users, Calendar, Award,
    CheckSquare, MessageSquare, Briefcase, TrendingUp, MoreVertical, Plus,
    Filter, Download
} from 'lucide-react'

// Mock Data
const BOARD_COLUMNS = ['New', 'Screening', 'Shortlisted', 'Selected', 'Rejected']
const APPLICATIONS = [
    { id: 1, name: 'EcoTech Solutions', stage: 'New', score: '-', reviewer: 'Unassigned' },
    { id: 2, name: 'FinFlow', stage: 'Screening', score: '8.5', reviewer: 'John Doe' },
    { id: 3, name: 'SaaS Master', stage: 'Shortlisted', score: '9.2', reviewer: 'Jane Smith' },
    { id: 4, name: 'EduLearn', stage: 'Rejected', score: '4.0', reviewer: 'John Doe' }
]

const COHORT_STARTUPS = [
    { id: 1, name: 'Alpha AI', founders: 'Alex & Sam', stage: 'MVP', sector: 'AI', manager: 'John Doe', mentors: 'Sarah Wilson' },
    { id: 2, name: 'GreenEnergy', founders: 'Mike Ross', stage: 'Growth', sector: 'CleanTech', manager: 'Jane Smith', mentors: 'Michael Chen' }
]

function OverviewTab({ program }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DashboardCard label="Total Applications" value="124" change="+12% vs last cohort" />
                <DashboardCard label="Acceptance Rate" value="3.2%" change="-0.5%" />
                <DashboardCard label="Active Startups" value="12" change="On track" />
                <DashboardCard label="Mentor Hours" value="45h" change="This month" />
            </div>

            <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-semibold text-lg mb-4">Cohort Health</h3>
                <div className="space-y-4">
                    {COHORT_STARTUPS.map(startup => (
                        <div key={startup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="font-medium">{startup.name}</h4>
                                <p className="text-sm text-gray-500">{startup.stage} • {startup.sector}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">On Track</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ApplicationsTab() {
    return (
        <div className="h-[calc(100vh-250px)] flex flex-col animate-fadeIn">
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50">
                        <Filter size={16} /> <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50">
                        <Download size={16} /> <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 h-full min-w-[1000px]">
                    {BOARD_COLUMNS.map(col => (
                        <div key={col} className="w-72 bg-gray-100 rounded-lg p-3 flex flex-col">
                            <h4 className="font-semibold text-gray-700 mb-3 flex justify-between">
                                {col} <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{APPLICATIONS.filter(a => a.stage === col).length}</span>
                            </h4>
                            <div className="flex-1 space-y-3 overflow-y-auto">
                                {APPLICATIONS.filter(a => a.stage === col).map(app => (
                                    <div key={app.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-move hover:shadow-md transition">
                                        <h5 className="font-medium text-gray-900">{app.name}</h5>
                                        <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                            <span>Score: {app.score}</span>
                                            <span>{app.reviewer}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function CohortTab() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Accepted Startups ({COHORT_STARTUPS.length})</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Add Startup</button>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="p-4">Name / Founders</th>
                            <th className="p-4">Stage / Sector</th>
                            <th className="p-4">Program Manager</th>
                            <th className="p-4">Mentors</th>
                            <th className="p-4">Tags</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {COHORT_STARTUPS.map(startup => (
                            <tr key={startup.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{startup.name}</div>
                                    <div className="text-sm text-gray-500">{startup.founders}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-gray-900">{startup.stage}</div>
                                    <div className="text-xs text-gray-500">{startup.sector}</div>
                                </td>
                                <td className="p-4 text-sm text-gray-700">{startup.manager}</td>
                                <td className="p-4 text-sm text-gray-700">{startup.mentors}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">High Priority</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'cohort', label: 'Cohort', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'mentors', label: 'Mentors', icon: Award },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'resources', label: 'Resources', icon: MessageSquare },
    { id: 'funding', label: 'Funding', icon: TrendingUp },
]

export default function ProgramDashboard({ program, onBack }) {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-1" /> Back to Programs
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{program.name}</h1>
                            <p className="text-gray-500 text-sm mt-1">{program.type} • {program.mode} • {program.status}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Settings</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Share Report</button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-6 flex space-x-6 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 bg-gray-50 min-h-[calc(100vh-140px)]">
                {activeTab === 'overview' && <OverviewTab program={program} />}
                {activeTab === 'applications' && <ApplicationsTab />}
                {activeTab === 'cohort' && <CohortTab />}

                {/* Placeholders for other tabs to keep file concise */}
                {['schedule', 'mentors', 'tasks', 'resources', 'funding'].includes(activeTab) && (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Module Under Construction</h3>
                        <p className="text-gray-500">The {TABS.find(t => t.id === activeTab).label} module is coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function DashboardCard({ label, value, change }) {
    return (
        <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <p className={`text-xs mt-2 ${change.includes('-') ? 'text-red-600' : change.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
                {change}
            </p>
        </div>
    )
}
