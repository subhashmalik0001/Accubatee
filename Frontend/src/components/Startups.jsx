import React, { useState, useEffect, useMemo } from 'react'
import {
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChartBarIcon,
    UserGroupIcon,
    RocketLaunchIcon,
    CalendarIcon,
    BellIcon,
    ArrowsUpDownIcon,
    CloudArrowDownIcon
} from '@heroicons/react/24/outline'

function Startups() {
    const [startups, setStartups] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        stage: 'all',
        domain: 'all',
        status: 'all',
        year: 'all'
    })
    const [viewMode, setViewMode] = useState('grid') // grid, table, kanban
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState('name') // name | stage | teamSize | foundedYear
    const [sortDir, setSortDir] = useState('asc') // asc | desc
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)

    // Debounce search term
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300)
        return () => clearTimeout(t)
    }, [searchTerm])

    // Mock data - replace with real API calls
    useEffect(() => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            const mockStartups = [
                {
                    id: 1,
                    name: 'TechFlow Solutions',
                    domain: 'FinTech',
                    stage: 'Seed',
                    status: 'Active',
                    foundedYear: 2023,
                    teamSize: 8,
                    funding: '$150K',
                    lastActivity: '2 hours ago',
                    avatar: '🚀',
                    health: 'excellent',
                    nextMilestone: 'Series A',
                    daysToMilestone: 45
                },
                {
                    id: 2,
                    name: 'GreenEco Innovations',
                    domain: 'CleanTech',
                    stage: 'Pre-seed',
                    status: 'Active',
                    foundedYear: 2024,
                    teamSize: 5,
                    funding: '$50K',
                    lastActivity: '1 day ago',
                    avatar: '🌿',
                    health: 'good',
                    nextMilestone: 'Seed Round',
                    daysToMilestone: 90
                },
                {
                    id: 3,
                    name: 'HealthTech Pro',
                    domain: 'HealthTech',
                    stage: 'Series A',
                    status: 'Active',
                    foundedYear: 2022,
                    teamSize: 15,
                    funding: '$500K',
                    lastActivity: '3 hours ago',
                    avatar: '🩺',
                    health: 'excellent',
                    nextMilestone: 'Series B',
                    daysToMilestone: 120
                },
                {
                    id: 4,
                    name: 'RetailWave',
                    domain: 'Retail',
                    stage: 'Seed',
                    status: 'Dormant',
                    foundedYear: 2021,
                    teamSize: 10,
                    funding: '$200K',
                    lastActivity: '3 weeks ago',
                    avatar: '🛍️',
                    health: 'warning',
                    nextMilestone: 'Product-Market Fit',
                    daysToMilestone: 75
                },
                {
                    id: 5,
                    name: 'EduSpark',
                    domain: 'EdTech',
                    stage: 'Pre-seed',
                    status: 'Active',
                    foundedYear: 2024,
                    teamSize: 4,
                    funding: '$25K',
                    lastActivity: '5 days ago',
                    avatar: '🎓',
                    health: 'good',
                    nextMilestone: 'Seed Round',
                    daysToMilestone: 110
                },
                {
                    id: 6,
                    name: 'LogiChain',
                    domain: 'SupplyChain',
                    stage: 'Series B',
                    status: 'Active',
                    foundedYear: 2020,
                    teamSize: 28,
                    funding: '$2.5M',
                    lastActivity: '6 hours ago',
                    avatar: '📦',
                    health: 'critical',
                    nextMilestone: 'Profitability',
                    daysToMilestone: 30
                }
            ]
            setStartups(mockStartups)
            setIsLoading(false)
        }, 800)
    }, [])

    // Helpers
    const getHealthColor = (health) => {
        switch (health) {
            case 'excellent': return 'bg-green-500'
            case 'good': return 'bg-blue-500'
            case 'warning': return 'bg-yellow-500'
            case 'critical': return 'bg-red-500'
            default: return 'bg-gray-400'
        }
    }

    const getStageBadge = (stage) => {
        switch (stage) {
            case 'Pre-seed': return 'bg-purple-100 text-purple-800'
            case 'Seed': return 'bg-blue-100 text-blue-800'
            case 'Series A': return 'bg-green-100 text-green-800'
            case 'Series B': return 'bg-orange-100 text-orange-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const years = useMemo(() => {
        const ys = Array.from(new Set(startups.map(s => s.foundedYear))).sort((a, b) => b - a)
        return ys
    }, [startups])

    // Filtering
    const filtered = useMemo(() => {
        const term = debouncedSearch.toLowerCase()
        return startups.filter(s => {
            const matchesSearch = !term ||
                s.name.toLowerCase().includes(term) ||
                s.domain.toLowerCase().includes(term)
            const matchesStage = selectedFilters.stage === 'all' || s.stage === selectedFilters.stage
            const matchesDomain = selectedFilters.domain === 'all' || s.domain === selectedFilters.domain
            const matchesStatus = selectedFilters.status === 'all' || s.status === selectedFilters.status
            const matchesYear = selectedFilters.year === 'all' || String(s.foundedYear) === selectedFilters.year
            return matchesSearch && matchesStage && matchesDomain && matchesStatus && matchesYear
        })
    }, [startups, debouncedSearch, selectedFilters])

    // Sorting
    const sorted = useMemo(() => {
        const copy = [...filtered]
        copy.sort((a, b) => {
            let av = a[sortBy]
            let bv = b[sortBy]
            if (sortBy === 'name' || sortBy === 'stage') {
                av = String(av).toLowerCase()
                bv = String(bv).toLowerCase()
                if (av < bv) return sortDir === 'asc' ? -1 : 1
                if (av > bv) return sortDir === 'asc' ? 1 : -1
                return 0
            }
            if (sortBy === 'teamSize' || sortBy === 'foundedYear') {
                const diff = (av ?? 0) - (bv ?? 0)
                return sortDir === 'asc' ? diff : -diff
            }
            return 0
        })
        return copy
    }, [filtered, sortBy, sortDir])

    // Pagination
    const total = sorted.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const currentPage = Math.min(page, totalPages)
    const startIdx = (currentPage - 1) * pageSize
    const endIdx = startIdx + pageSize
    const pageItems = sorted.slice(startIdx, endIdx)

    useEffect(() => {
        // Reset to first page when filters/search/sort change
        setPage(1)
    }, [debouncedSearch, selectedFilters, sortBy, sortDir, pageSize])

    const toggleSort = (key) => {
        if (sortBy === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(key)
            setSortDir('asc')
        }
    }

    const exportCSV = () => {
        const headers = ['Name', 'Domain', 'Stage', 'Status', 'FoundedYear', 'TeamSize', 'Funding', 'LastActivity', 'NextMilestone', 'DaysToMilestone']
        const rows = sorted.map(s => [
            s.name, s.domain, s.stage, s.status, s.foundedYear, s.teamSize, s.funding, s.lastActivity, s.nextMilestone, s.daysToMilestone
        ])
        const csv = [headers, ...rows].map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'startups.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Startups</h1>
                        <p className="mt-2 text-gray-600">
                            {startups.length} total • {filtered.length} matching • page {currentPage} of {totalPages}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border flex items-center space-x-2 transition-colors" onClick={exportCSV}>
                            <CloudArrowDownIcon className="h-5 w-5" />
                            <span>Export CSV</span>
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                            <PlusIcon className="h-5 w-5" />
                            <span>Add Startup</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or domain..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center text-gray-500">
                            <FunnelIcon className="h-5 w-5 mr-1" />
                            <span className="text-sm">Filters</span>
                        </div>

                        <select
                            value={selectedFilters.stage}
                            onChange={(e) => setSelectedFilters({ ...selectedFilters, stage: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Stages</option>
                            <option value="Pre-seed">Pre-seed</option>
                            <option value="Seed">Seed</option>
                            <option value="Series A">Series A</option>
                            <option value="Series B">Series B</option>
                        </select>

                        <select
                            value={selectedFilters.domain}
                            onChange={(e) => setSelectedFilters({ ...selectedFilters, domain: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Domains</option>
                            {Array.from(new Set(startups.map(s => s.domain))).map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <select
                            value={selectedFilters.status}
                            onChange={(e) => setSelectedFilters({ ...selectedFilters, status: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            {Array.from(new Set(startups.map(s => s.status))).map(st => (
                                <option key={st} value={st}>{st}</option>
                            ))}
                        </select>

                        <select
                            value={selectedFilters.year}
                            onChange={(e) => setSelectedFilters({ ...selectedFilters, year: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Years</option>
                            {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
                        </select>

                        <button
                            onClick={() => setSelectedFilters({ stage: 'all', domain: 'all', status: 'all', year: 'all' })}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Sort & View */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => toggleSort('name')}
                                className={`px-3 py-2 rounded-lg text-sm border ${sortBy === 'name' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                            >
                                Name
                            </button>
                            <button
                                onClick={() => toggleSort('stage')}
                                className={`px-3 py-2 rounded-lg text-sm border ${sortBy === 'stage' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                            >
                                Stage
                            </button>
                            <button
                                onClick={() => toggleSort('teamSize')}
                                className={`px-3 py-2 rounded-lg text-sm border ${sortBy === 'teamSize' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                            >
                                Team Size
                            </button>
                            <button
                                onClick={() => toggleSort('foundedYear')}
                                className={`px-3 py-2 rounded-lg text-sm border ${sortBy === 'foundedYear' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                            >
                                Year
                            </button>
                            <span className="ml-1 inline-flex items-center text-gray-500">
                                <ArrowsUpDownIcon className="h-4 w-4 mr-1" />
                                <span className="text-xs">{sortDir === 'asc' ? 'Asc' : 'Desc'}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            {[6, 9, 12, 24].map(n => <option key={n} value={n}>{n} / page</option>)}
                        </select>
                        <div className="inline-flex rounded-lg border overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Table
                            </button>
                            <button
                                onClick={() => setViewMode('kanban')}
                                className={`px-3 py-2 text-sm ${viewMode === 'kanban' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Kanban
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageItems.map((startup) => (
                        <div key={startup.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-3xl">{startup.avatar}</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{startup.name}</h3>
                                            <p className="text-sm text-gray-600">{startup.domain}</p>
                                        </div>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${getHealthColor(startup.health)}`}></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Stage</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageBadge(startup.stage)}`}>
                                            {startup.stage}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Team Size</span>
                                        <span className="font-medium">{startup.teamSize}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Funding</span>
                                        <span className="font-medium text-green-600">{startup.funding}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Status</span>
                                        <span className="font-medium">{startup.status}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Last Activity</span>
                                        <span className="text-gray-500">{startup.lastActivity}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Next: {startup.nextMilestone}</span>
                                        <span>{startup.daysToMilestone} days</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${Math.max(0, 100 - (startup.daysToMilestone / 120) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                        View Details
                                    </button>
                                    <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        { key: 'name', label: 'Name' },
                                        { key: 'domain', label: 'Domain' },
                                        { key: 'stage', label: 'Stage' },
                                        { key: 'status', label: 'Status' },
                                        { key: 'teamSize', label: 'Team' },
                                        { key: 'foundedYear', label: 'Founded' },
                                        { key: 'funding', label: 'Funding' },
                                        { key: 'lastActivity', label: 'Last Activity' }
                                    ].map(col => (
                                        <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button
                                                className="inline-flex items-center gap-1 hover:text-gray-900"
                                                onClick={() => toggleSort(col.key)}
                                            >
                                                {col.label}
                                                {['name', 'stage', 'teamSize', 'foundedYear'].includes(col.key) && (
                                                    <ArrowsUpDownIcon className={`h-4 w-4 ${sortBy === col.key ? 'text-blue-600' : 'text-gray-400'}`} />
                                                )}
                                            </button>
                                        </th>
                                    ))}
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {pageItems.map(s => (
                                    <tr key={s.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{s.avatar}</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">{s.name}</div>
                                                    <div className="text-xs text-gray-500">{s.nextMilestone} • {s.daysToMilestone} days</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{s.domain}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageBadge(s.stage)}`}>{s.stage}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{s.status}</td>
                                        <td className="px-4 py-3 text-gray-700">{s.teamSize}</td>
                                        <td className="px-4 py-3 text-gray-700">{s.foundedYear}</td>
                                        <td className="px-4 py-3 text-green-600">{s.funding}</td>
                                        <td className="px-4 py-3 text-gray-500">{s.lastActivity}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Kanban View */}
            {viewMode === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Pre-seed', 'Seed', 'Series A', 'Series B'].map(stage => {
                        const items = pageItems.filter(s => s.stage === stage)
                        return (
                            <div key={stage} className="bg-gray-50 border rounded-xl">
                                <div className="px-4 py-3 border-b flex items-center justify-between">
                                    <div className="font-medium text-gray-900">{stage}</div>
                                    <div className="text-xs text-gray-500">{items.length}</div>
                                </div>
                                <div className="p-3 space-y-3">
                                    {items.length === 0 && (
                                        <div className="text-xs text-gray-500 text-center py-6">No startups</div>
                                    )}
                                    {items.map(s => (
                                        <div key={s.id} className="bg-white border rounded-lg p-3 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{s.avatar}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{s.name}</div>
                                                        <div className="text-xs text-gray-500">{s.domain}</div>
                                                    </div>
                                                </div>
                                                <div className={`w-2 h-2 rounded-full ${getHealthColor(s.health)}`}></div>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                                                <span>Team: <span className="font-medium">{s.teamSize}</span></span>
                                                <span className="text-green-600">{s.funding}</span>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">
                                                Next: {s.nextMilestone} • {s.daysToMilestone} days
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Pagination */}
            {total > 0 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {Math.min(endIdx, total)} of {total}
                    </div>
                    <div className="inline-flex rounded-md shadow-sm">
                        <button
                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <div className="px-4 py-2 text-sm bg-white border-t border-b border-gray-300">
                            {currentPage} / {totalPages}
                        </div>
                        <button
                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {sorted.length === 0 && (
                <div className="text-center py-12">
                    <RocketLaunchIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No startups found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {debouncedSearch || Object.values(selectedFilters).some(f => f !== 'all')
                            ? 'Try adjusting your search, filters, or sorting.'
                            : 'Get started by adding your first startup.'}
                    </p>
                    <div className="mt-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            Add Startup
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Startups