import React from 'react'

const items = [
    'Users',
    'Directory',
    'Programs',
    'Cohorts',
    'Pipeline',
    'Mail',
    'Form',
    'Groups',
    'Partnership',
    'Site Settings',
    'Site Usage',
    'Payments'
]

export default function ProgramSubnav({ active, onChange }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <div className="px-4 py-3 flex flex-wrap gap-2">
                {items.map((t) => {
                    const isActive = active === t
                    return (
                        <button
                            key={t}
                            onClick={() => onChange(t)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                                ${isActive ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                        >
                            {t}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}