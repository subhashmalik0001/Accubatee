import React, { useMemo, useState } from 'react'
import {
    AdjustmentsHorizontalIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    Squares2X2Icon,
    MegaphoneIcon,
    ArrowDownOnSquareStackIcon,
    ArrowUpOnSquareStackIcon,
    TrashIcon,
    ArrowRightCircleIcon,
    ArrowUturnLeftIcon,
    UserGroupIcon,
    QuestionMarkCircleIcon,
    PrinterIcon,
    DocumentArrowDownIcon,
    TagIcon,
    ShieldCheckIcon,
    BanknotesIcon,
    ChartBarIcon,
    CalendarDaysIcon,
    PresentationChartBarIcon,
    BellAlertIcon
} from '@heroicons/react/24/outline'

function Applications() {
    const [activeTab, setActiveTab] = useState('Applications')
    const [search, setSearch] = useState('')
    const [stage, setStage] = useState('Enquiry Stage')
    const [filtersOpen, setFiltersOpen] = useState(false)

    const tabs = useMemo(() => ([
        { name: 'Applications', icon: Squares2X2Icon },
        { name: 'Evaluations', icon: ShieldCheckIcon },
        { name: 'Meetings', icon: CalendarDaysIcon },
        { name: 'Analytics', icon: ChartBarIcon },
        { name: 'Marketing', icon: MegaphoneIcon },
        { name: 'Payments', icon: BanknotesIcon },
        { name: 'Announcement', icon: BellAlertIcon },
    ]), [])

    const primaryActions = useMemo(() => ([
        { name: 'Settings', icon: Cog6ToothIcon },
        { name: 'Edit Columns', icon: AdjustmentsHorizontalIcon },
        { name: 'Send Announcement', icon: MegaphoneIcon },
        { name: 'Print to PDF', icon: PrinterIcon },
        { name: 'Export to Excel', icon: DocumentArrowDownIcon },
        { name: 'Reject', icon: ArrowDownOnSquareStackIcon },
        { name: 'Delete', icon: TrashIcon },
        { name: 'Move to Next Stage', icon: ArrowRightCircleIcon },
        { name: 'Demote', icon: ArrowUturnLeftIcon },
        { name: 'Onboard', icon: ShieldCheckIcon },
        { name: 'Manage Evaluators', icon: UserGroupIcon },
        { name: 'Move to another pipeline', icon: ArrowRightCircleIcon },
        { name: 'Import', icon: ArrowUpOnSquareStackIcon },
        { name: 'Update Tags', icon: TagIcon },
        { name: 'Help', icon: QuestionMarkCircleIcon },
    ]), [])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 text-blue-600 font-semibold">1</div>
                        <div className="text-sm text-blue-700 font-medium">{stage}</div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
                        CU-TBI | Startup Onboarding Program | General 2025 Applications
                    </h1>
                </div>
                <button
                    className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
                    onClick={() => setStage(s => s === 'Enquiry Stage' ? 'Screening Stage' : 'Enquiry Stage')}
                >
                    <span>Change Pipeline</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-4 sm:px-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(t => {
                            const Icon = t.icon
                            const active = activeTab === t.name
                            return (
                                <button
                                    key={t.name}
                                    onClick={() => setActiveTab(t.name)}
                                    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors
                                        ${active ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200' : 'text-gray-600 hover:bg-gray-50'}
                                    `}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{t.name}</span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-4 border-t" />

                    <div className="py-3 flex flex-wrap items-center gap-2">
                        {primaryActions.map(a => {
                            const Icon = a.icon
                            return (
                                <button
                                    key={a.name}
                                    className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 shadow-sm"
                                    onClick={() => { }}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{a.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="px-4 sm:px-6 py-3 border-t bg-gray-50/60">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setFiltersOpen(v => !v)}
                            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border shadow-sm
                                ${filtersOpen ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
                            `}
                        >
                            <FunnelIcon className="h-4 w-4" />
                            <span>Filters</span>
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm">
                            <AdjustmentsHorizontalIcon className="h-4 w-4" />
                            <span>Advanced Filter</span>
                        </button>

                        <div className="relative flex-1 min-w-[260px] max-w-xl">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Search Applications"
                            />
                        </div>
                    </div>

                    {filtersOpen && (
                        <div className="mt-3 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800">
                            Quick filter panel (placeholder): stage, tags, evaluator, date range.
                        </div>
                    )}
                </div>

                <div className="p-8">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm border">
                            <Squares2X2Icon className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-900">No applications</p>
                        <p className="mt-1 text-xs text-gray-500">When applications arrive, they’ll appear here. Use filters and actions above to manage them.</p>
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <button className="rounded-md bg-blue-600 text-white text-sm px-4 py-2 hover:bg-blue-700">Create Application</button>
                            <button className="rounded-md border border-gray-200 bg-white text-gray-700 text-sm px-4 py-2 hover:bg-gray-50">Import</button>
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-6 py-4 border-t bg-white rounded-b-lg">
                    <div className="flex justify-end gap-4 text-xs text-gray-500">
                        <button className="hover:text-gray-700">Support</button>
                        <span>•</span>
                        <button className="hover:text-gray-700">Feedback</button>
                        <span>•</span>
                        <button className="hover:text-gray-700">Terms of use</button>
                        <span>•</span>
                        <button className="hover:text-gray-700">Privacy Policy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applications