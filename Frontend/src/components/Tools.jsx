import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'

const TabNav = () => {
    const tabs = [
        { to: '/tools/community', label: 'Community', icon: '👥' },
        { to: '/tools/announcement', label: 'Announcement', icon: '📣' },
        { to: '/tools/survey', label: 'Survey', icon: '📝' },
        { to: '/tools/grievances', label: 'Grievances', icon: '⚠️' },
        { to: '/tools/resources', label: 'Resources', icon: '📚' },
        { to: '/tools/mappings', label: 'Mappings', icon: '🗺️' },
        { to: '/tools/noticeboard', label: 'Noticeboard', icon: '📌' },
        { to: '/tools/documents', label: 'Documents', icon: '🗃️' },
        { to: '/tools/accounting', label: 'Accounting', icon: '💼' },
        { to: '/tools/invoices', label: 'Invoices', icon: '🧾' },
    ]
    return (
        <div className="bg-white border rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Tools</h2>
                <p className="text-sm text-gray-500">Manage collaboration, communication, and operations</p>
            </div>
            <div className="px-2 overflow-x-auto">
                <div className="flex gap-2 min-w-max p-2">
                    {tabs.map(t => (
                        <NavLink
                            key={t.to}
                            to={t.to}
                            className={({ isActive }) =>
                                `inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                            end
                        >
                            <span>{t.icon}</span>
                            {t.label}
                        </NavLink>
                    ))}

                </div>
            </div>
        </div >
    )
}

/* ——— Tab Pages ——— */

const Community = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Create Post</h3>
                    <textarea className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" rows="3" placeholder="Share an update, ask a question..."></textarea>
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex gap-2 text-sm text-gray-500">
                            <button className="px-2 py-1 hover:text-gray-700">Attach</button>
                            <button className="px-2 py-1 hover:text-gray-700">Poll</button>
                            <button className="px-2 py-1 hover:text-gray-700">Tag</button>
                        </div>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Post</button>
                    </div>
                </div>
                <div className="bg-white border rounded-lg p-4 md:col-span-2 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
                    <ul className="divide-y">
                        {['Welcome new cohort!', 'Mentor AMA on Friday', 'Share your pitch deck templates'].map((t, i) => (
                            <li key={i} className="py-3">
                                <p className="font-medium text-gray-800">{t}</p>
                                <p className="text-sm text-gray-500">Posted by Admin • 2h ago</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

const Announcement = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">New Announcement</h3>
                    <div className="text-sm text-gray-500">Will notify all relevant members</div>
                </div>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                    <input className="border rounded-md p-2 text-sm" placeholder="Title" />
                    <select className="border rounded-md p-2 text-sm">
                        <option>All Users</option>
                        <option>Startups</option>
                        <option>Mentors</option>
                        <option>Program Managers</option>
                    </select>
                    <textarea className="md:col-span-2 border rounded-md p-2 text-sm" rows="4" placeholder="Body"></textarea>
                    <div className="md:col-span-2 flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" /> Require acknowledgment
                        </label>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border rounded-md text-sm">Save Draft</button>
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Publish</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Recent Announcements</h3>
                <ul className="divide-y">
                    {['Cohort kickoff', 'Facility maintenance window', 'Demo day timeline'].map((t, i) => (
                        <li key={i} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">{t}</p>
                                <p className="text-sm text-gray-500">Published • 1d ago</p>
                            </div>
                            <button className="text-sm text-blue-600">View</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const Survey = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800">Build Survey</h3>
                <div className="mt-3 space-y-3">
                    <input className="border rounded-md p-2 text-sm w-full" placeholder="Survey title" />
                    <div className="space-y-2">
                        {[1, 2, 3].map((q) => (
                            <div key={q} className="border rounded-md p-3">
                                <div className="flex items-center justify-between">
                                    <input className="text-sm w-full mr-2 outline-none" placeholder={`Question ${q}`} />
                                    <select className="border rounded-md p-1 text-sm">
                                        <option>Short Text</option>
                                        <option>Long Text</option>
                                        <option>Multiple Choice</option>
                                        <option>Rating</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="px-3 py-1.5 border rounded-md text-sm">Add Question</button>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Publish</button>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Responses</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="border rounded-md p-3">
                        <p className="text-gray-500">Total Responses</p>
                        <p className="text-2xl font-semibold text-gray-800">128</p>
                    </div>
                    <div className="border rounded-md p-3">
                        <p className="text-gray-500">Avg. Completion</p>
                        <p className="text-2xl font-semibold text-gray-800">87%</p>
                    </div>
                    <div className="border rounded-md p-3">
                        <p className="text-gray-500">Last 7 Days</p>
                        <p className="text-2xl font-semibold text-gray-800">34</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Grievances = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800">Submit Grievance</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <input className="border rounded-md p-2 text-sm" placeholder="Subject" />
                    <select className="border rounded-md p-2 text-sm">
                        <option>Facilities</option>
                        <option>Finance</option>
                        <option>Program</option>
                        <option>HR</option>
                    </select>
                    <textarea className="md:col-span-2 border rounded-md p-2 text-sm" rows="4" placeholder="Describe the issue"></textarea>
                    <div className="md:col-span-2 flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" /> Anonymous
                        </label>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Submit</button>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Tracking</h3>
                <ul className="divide-y text-sm">
                    {[
                        { id: 'GR-1045', status: 'Open', dept: 'Facilities' },
                        { id: 'GR-1021', status: 'In Review', dept: 'Finance' },
                        { id: 'GR-1003', status: 'Resolved', dept: 'Program' },
                    ].map((g) => (
                        <li key={g.id} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">{g.id}</p>
                                <p className="text-gray-500">{g.dept}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${g.status === 'Resolved' ? 'bg-green-100 text-green-700' : g.status === 'Open' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{g.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const Resources = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Resource Library</h3>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Upload</button>
                </div>
                <div className="mt-3 grid md:grid-cols-3 gap-4">
                    {['Pitch Deck', 'Financial Model', 'Term Sheet', 'Brand Kit', 'PR Template', 'Hiring JD'].map((r, i) => (
                        <div key={i} className="border rounded-md p-3">
                            <p className="font-medium text-gray-800">{r}</p>
                            <p className="text-sm text-gray-500">Updated 3d ago</p>
                            <div className="mt-2 flex gap-2">
                                <button className="text-sm text-blue-600">View</button>
                                <button className="text-sm">Download</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Mappings = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800">Mappings</h3>
                <p className="text-sm text-gray-500">Define relationships like startup↔mentor, program↔cohort, resource↔tag</p>
                <div className="mt-3 grid md:grid-cols-3 gap-4">
                    {['Startup ↔ Mentor', 'Program ↔ Cohort', 'Resource ↔ Tag'].map((t, i) => (
                        <div key={i} className="border rounded-md p-3">
                            <p className="font-medium text-gray-800">{t}</p>
                            <button className="mt-2 px-3 py-1.5 border rounded-md text-sm">Manage</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Noticeboard = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Noticeboard</h3>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">New Notice</button>
                </div>
                <ul className="mt-3 divide-y">
                    {[
                        { title: 'Office closed on Friday', date: '2025-02-14' },
                        { title: 'WiFi upgrade - brief downtime', date: '2025-02-10' },
                        { title: 'Parking allocation update', date: '2025-02-05' },
                    ].map((n, i) => (
                        <li key={i} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">{n.title}</p>
                                <p className="text-sm text-gray-500">{n.date}</p>
                            </div>
                            <button className="text-sm text-blue-600">View</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const Documents = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Documents</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border rounded-md text-sm">Upload</button>
                        <button className="px-3 py-1.5 border rounded-md text-sm">New Folder</button>
                    </div>
                </div>
                <div className="mt-3 grid md:grid-cols-3 gap-4">
                    {['Agreements', 'Compliance', 'HR', 'Finance', 'Operations', 'Legal'].map((f, i) => (
                        <div key={i} className="border rounded-md p-3">
                            <p className="font-medium text-gray-800">{f}</p>
                            <p className="text-sm text-gray-500">12 items</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Accounting = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800">Accounting Dashboard</h3>
                <div className="grid md:grid-cols-4 gap-4 mt-3 text-sm">
                    {[
                        { k: 'Budget Used', v: '62%' },
                        { k: 'Open POs', v: 14 },
                        { k: 'Pending Approvals', v: 5 },
                        { k: 'Reimbursements', v: 8 },
                    ].map((m, i) => (
                        <div key={i} className="border rounded-md p-3">
                            <p className="text-gray-500">{m.k}</p>
                            <p className="text-2xl font-semibold text-gray-800">{m.v}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Recent Transactions</h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="py-2">Date</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {[
                            { d: '2025-02-10', t: 'Cloud hosting', a: '-$320.00', s: 'Paid' },
                            { d: '2025-02-08', t: 'Mentor honorarium', a: '-$500.00', s: 'Pending' },
                            { d: '2025-02-04', t: 'Grant received', a: '+$10,000.00', s: 'Settled' },
                        ].map((r, i) => (
                            <tr key={i}>
                                <td className="py-2">{r.d}</td>
                                <td className="py-2">{r.t}</td>
                                <td className="py-2">{r.a}</td>
                                <td className="py-2">
                                    <span className={`px-2 py-1 rounded ${r.s === 'Paid' || r.s === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.s}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

const Invoices = () => {
    return (
        <section className="mt-6 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Invoices</h3>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">New Invoice</button>
                </div>
                <table className="w-full text-sm mt-3">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="py-2">Invoice #</th>
                            <th className="py-2">Client</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Status</th>
                            <th className="py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {[
                            { id: 'INV-1201', c: 'Acme Labs', d: '2025-02-09', a: '$1,200.00', s: 'Sent' },
                            { id: 'INV-1198', c: 'Beta Fund', d: '2025-02-02', a: '$8,500.00', s: 'Paid' },
                            { id: 'INV-1196', c: 'Gamma Corp', d: '2025-01-28', a: '$2,100.00', s: 'Overdue' },
                        ].map((inv, i) => (
                            <tr key={i}>
                                <td className="py-2">{inv.id}</td>
                                <td className="py-2">{inv.c}</td>
                                <td className="py-2">{inv.d}</td>
                                <td className="py-2">{inv.a}</td>
                                <td className="py-2">
                                    <span className={`px-2 py-1 rounded ${inv.s === 'Paid' ? 'bg-green-100 text-green-700' : inv.s === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{inv.s}</span>
                                </td>
                                <td className="py-2 text-right">
                                    <button className="text-blue-600">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default function Tools() {
    return (
        <div>
            <TabNav />
            <Routes>
                <Route index element={<Navigate to="community" replace />} />
                <Route path="community" element={<Community />} />
                <Route path="announcement" element={<Announcement />} />
                <Route path="survey" element={<Survey />} />
                <Route path="grievances" element={<Grievances />} />
                <Route path="resources" element={<Resources />} />
                <Route path="mappings" element={<Mappings />} />
                <Route path="noticeboard" element={<Noticeboard />} />
                <Route path="documents" element={<Documents />} />
                <Route path="accounting" element={<Accounting />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="*" element={<Navigate to="community" replace />} />
            </Routes>
        </div>
    )
}
