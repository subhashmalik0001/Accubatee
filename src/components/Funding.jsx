import React, { useEffect, useMemo, useState } from 'react'

function Funding() {
    // Tabs/categories across the top
    const TABS = [
        { key: 'grant', label: 'Grant Funds' },
        { key: 'equity', label: 'Equity Funds' },
        { key: 'debt', label: 'Debt Funds' },
        { key: 'demo', label: 'Demo Days' },
        { key: 'nominations', label: 'All Nominations' },
    ]

    const [activeTab, setActiveTab] = useState('grant')
    const [query, setQuery] = useState('')
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('accubate.funding')
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    })

    const [modalOpen, setModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        title: '',
        type: 'grant',
        organization: '',
        amount: '',
        deadline: '',
        status: 'Open',
        notes: '',
    })

    useEffect(() => {
        try {
            localStorage.setItem('accubate.funding', JSON.stringify(items))
        } catch {
            // no-op
        }
    }, [items])

    const resetForm = () => {
        setEditingId(null)
        setForm({
            title: '',
            type: activeTab || 'grant',
            organization: '',
            amount: '',
            deadline: '',
            status: 'Open',
            notes: '',
        })
    }

    const openCreate = () => {
        resetForm()
        setModalOpen(true)
    }

    const openEdit = (item) => {
        setEditingId(item.id)
        setForm({
            title: item.title,
            type: item.type,
            organization: item.organization || '',
            amount: item.amount || '',
            deadline: item.deadline || '',
            status: item.status || 'Open',
            notes: item.notes || '',
        })
        setModalOpen(true)
    }

    const handleSubmit = (e) => {
        e?.preventDefault?.()
        if (!form.title?.trim()) return

        const payload = {
            ...form,
            id: editingId ?? crypto.randomUUID(),
            createdAt: editingId
                ? items.find((x) => x.id === editingId)?.createdAt
                : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        if (editingId) {
            setItems((prev) => prev.map((x) => (x.id === editingId ? payload : x)))
        } else {
            setItems((prev) => [payload, ...prev])
        }

        setModalOpen(false)
        resetForm()
    }

    const handleDelete = (id) => {
        // simple confirm to prevent accidents
        if (!window.confirm('Delete this funding item?')) return
        setItems((prev) => prev.filter((x) => x.id !== id))
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return items
            .filter((x) => (activeTab === 'nominations' ? true : x.type === activeTab))
            .filter((x) => {
                if (!q) return true
                return (
                    x.title.toLowerCase().includes(q) ||
                    (x.organization || '').toLowerCase().includes(q) ||
                    (x.status || '').toLowerCase().includes(q)
                )
            })
    }, [items, query, activeTab])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Funding</h1>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <span className="text-xl leading-none">+</span>
                    Add New
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6 overflow-x-auto">
                    {TABS.map((t) => {
                        const active = t.key === activeTab
                        return (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={[
                                    'whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium',
                                    active
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300',
                                ].join(' ')}
                            >
                                {t.label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* Actions row */}
            <div className="mt-4 mb-6 flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                        {/* search icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 21l-4.3-4.3m1.3-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="text-sm text-gray-500">
                    {filtered.length} result{filtered.length === 1 ? '' : 's'}
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-200 bg-white py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 5v14m7-7H5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <p className="mt-4 text-lg font-medium text-gray-900">No Funding Found</p>
                    <p className="mt-1 text-gray-500">
                        Get started by adding your first funding.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="text-xl leading-none">+</span>
                            Add New Funding
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((x) => (
                        <div key={x.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">{x.title}</h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {x.organization || '—'}
                                    </p>
                                </div>
                                <span
                                    className={[
                                        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                        x.status === 'Open'
                                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                                            : x.status === 'Closed'
                                                ? 'bg-gray-50 text-gray-600 ring-1 ring-gray-400/20'
                                                : 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20',
                                    ].join(' ')}
                                >
                                    {x.status}
                                </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <div className="text-[11px] uppercase tracking-wide text-gray-500">
                                        Amount
                                    </div>
                                    <div className="font-medium text-gray-900">
                                        {x.amount ? `₹ ${x.amount}` : '—'}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <div className="text-[11px] uppercase tracking-wide text-gray-500">
                                        Deadline
                                    </div>
                                    <div className="font-medium text-gray-900">
                                        {x.deadline || '—'}
                                    </div>
                                </div>
                            </div>
                            {x.notes ? (
                                <p className="mt-3 line-clamp-2 text-sm text-gray-600">{x.notes}</p>
                            ) : null}
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {new Date(x.createdAt).toLocaleDateString()}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEdit(x)}
                                        className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(x.id)}
                                        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer (simple links row, mirrors screenshot) */}
            <div className="mt-12 flex items-center justify-center gap-4 text-xs text-gray-500">
                <button className="hover:text-gray-700">Support</button>
                <span>•</span>
                <button className="hover:text-gray-700">Feedback</button>
                <span>•</span>
                <button className="hover:text-gray-700">Terms of use</button>
                <span>•</span>
                <button className="hover:text-gray-700">Privacy Policy</button>
            </div>

            {/* Modal */}
            {modalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => {
                            setModalOpen(false)
                            resetForm()
                        }}
                    />
                    <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingId ? 'Edit Funding' : 'Add New Funding'}
                            </h2>
                            <button
                                onClick={() => {
                                    setModalOpen(false)
                                    resetForm()
                                }}
                                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 6l12 12M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, title: e.target.value }))
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.type}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, type: e.target.value }))
                                        }
                                    >
                                        {TABS.filter((t) => t.key !== 'nominations').map((t) => (
                                            <option key={t.key} value={t.key}>
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, status: e.target.value }))
                                        }
                                    >
                                        <option>Open</option>
                                        <option>Upcoming</option>
                                        <option>Closed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Organization
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.organization}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, organization: e.target.value }))
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.amount}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, amount: e.target.value }))
                                        }
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.deadline}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, deadline: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Notes
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        value={form.notes}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, notes: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalOpen(false)
                                        resetForm()
                                    }}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {editingId ? 'Save Changes' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Funding