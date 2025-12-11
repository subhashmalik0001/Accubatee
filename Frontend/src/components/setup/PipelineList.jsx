import React from 'react'
import { Icons } from './Programicons'

function PipelineCard({ pipeline, onSelect }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Icons.Pipeline />
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">{pipeline.name}</h4>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                    <span>Stages:</span>
                    <span className="font-medium">{pipeline.stages?.length || 0}</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button onClick={() => onSelect(pipeline)} className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors">
                    View/Edit
                </button>
            </div>
        </div>
    )
}

export default function PipelineList({ cohort, onSelect }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {cohort.name} · Pipelines
                </h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Icons.Plus />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(cohort.pipelines || []).map((p) => (
                    <PipelineCard key={p.id} pipeline={p} onSelect={onSelect} />
                ))}
            </div>
        </div>
    )
}