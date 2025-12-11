import React from 'react'
import { Icons } from './Programicons'

function CohortCard({ cohort, onSelect }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icons.Cohorts />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${cohort.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {cohort.status}
                </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">{cohort.name}</h4>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                    <span>Pipelines:</span>
                    <span className="font-medium">{cohort.pipelines?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Start Date:</span>
                    <span className="font-medium">{cohort.startDate}</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button onClick={() => onSelect(cohort)} className="flex-1 px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-sm font-medium transition-colors">
                    View Pipelines
                </button>
                <button className="px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Icons.Edit />
                </button>
            </div>
        </div>
    )
}

export default function CohortList({ program, onSelect }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {program.name} · Cohorts
                </h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Icons.Plus />
                    <span>Create Cohort</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(program.cohorts || []).map((c) => (
                    <CohortCard key={c.id} cohort={c} onSelect={onSelect} />
                ))}
            </div>
        </div>
    )
}