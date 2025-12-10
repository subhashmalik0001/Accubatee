import React, { useState } from 'react'
import { Icons } from './Programicons'

function StageRow({ stage }) {
    const color = stage.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
    return (
        <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg bg-white">
            <div>
                <p className="font-medium text-gray-900">{stage.name}</p>
                <p className="text-xs text-gray-500 mt-1">{stage.info}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{stage.status}</span>
        </div>
    )
}

export default function PipelineBoard({ cohort, pipeline }) {
    const [activeTab, setActiveTab] = useState('Application')
    const secondLineTabs = [
        'General',
        'Application',
        'Application Form Design',
        'Evaluation',
        'Mentoring',
        'Payment',
        'E-Signature'
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {cohort.name} · {pipeline?.name || 'Pipeline'}
                </h3>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                        <Icons.Plus /> <span>Add Stage</span>
                    </button>
                    <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                        Settings
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 pt-3">
                    <div className="flex flex-wrap gap-2">
                        {secondLineTabs.map((t) => {
                            const active = activeTab === t
                            return (
                                <button
                                    key={t}
                                    onClick={() => setActiveTab(t)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                                        ${active ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                                >
                                    {t}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                    {activeTab === 'Application' && (
                        <div className="space-y-3">
                            {(pipeline?.stages || []).map((s) => (
                                <StageRow key={s.id} stage={s} />
                            ))}
                        </div>
                    )}
                    {activeTab !== 'Application' && (
                        <div className="text-sm text-gray-600">Content for {activeTab}</div>
                    )}
                </div>
            </div>
        </div>
    )
}