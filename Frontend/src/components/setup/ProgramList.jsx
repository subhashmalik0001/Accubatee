import React, { useState, useEffect } from 'react'
import { Icons } from './Programicons'
import { X, Check, ChevronRight, ChevronLeft, Calendar, Users, FileText, Settings, Award } from 'lucide-react'

// Mock data for dropdowns
const USERS = [
    { id: 1, name: 'John Doe', role: 'Program Manager' },
    { id: 2, name: 'Jane Smith', role: 'Incubation Manager' },
    { id: 3, name: 'Robert Fox', role: 'Admin' }
]

const MENTORS = [
    { id: 1, name: 'Dr. Sarah Wilson', expertise: 'Fintech' },
    { id: 2, name: 'Michael Chen', expertise: 'SaaS' }
]

function ProgramCard({ program, onSelect, onEdit }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icons.Programs />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${program.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {program.status}
                </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">{program.name}</h4>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{program.description || 'No description provided.'}</p>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                    <span>Participants:</span>
                    <span className="font-medium">{program.participants || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{program.startDate ? `${new Date(program.startDate).toLocaleDateString()} - ${new Date(program.endDate).toLocaleDateString()}` : 'TBD'}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Cohorts:</span>
                    <span className="font-medium">{program.cohorts?.length || 0}</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button onClick={() => onSelect(program)} className="flex-1 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors">
                    Manage Program
                </button>
                <button onClick={() => onEdit(program)} className="px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Icons.Edit />
                </button>
            </div>
        </div>
    )
}

export default function ProgramList({ programs: initialPrograms, onSelect }) {
    const [programs, setPrograms] = useState(initialPrograms || [])
    const [isWizardOpen, setIsWizardOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [editingId, setEditingId] = useState(null)

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Basic
        name: '',
        description: '',
        type: 'Incubator',
        focus: '',
        mode: 'Hybrid',
        // Step 2: Timeline
        applicationStart: '',
        applicationEnd: '',
        programStart: '',
        programEnd: '',
        milestones: [{ name: 'Orientation', date: '' }, { name: 'Demo Day', date: '' }],
        // Step 3: Capacity
        cohortLabel: '',
        maxParticipants: '',
        eligibleStages: [],
        eligibilityCriteria: '',
        // Step 4: Application
        urlSlug: '',
        formTemplate: 'Standard Startup Application',
        // Step 5: Team
        programOwner: '',
        internalReviewers: [],
        defaultMentors: []
    })

    const steps = [
        { id: 1, title: 'Basic Details', icon: FileText },
        { id: 2, title: 'Timeline', icon: Calendar },
        { id: 3, title: 'Capacity', icon: Users },
        { id: 4, title: 'Application', icon: Settings },
        { id: 5, title: 'Team & Roles', icon: Award }
    ]

    const handleOpenWizard = (programToEdit = null) => {
        if (programToEdit) {
            setEditingId(programToEdit.id)
            setFormData({ ...formData, ...programToEdit }) // In real app, would need better mapping
        } else {
            setEditingId(null)
            // Reset form
            setFormData({
                name: '', description: '', type: 'Incubator', focus: '', mode: 'Hybrid',
                applicationStart: '', applicationEnd: '', programStart: '', programEnd: '',
                milestones: [{ name: 'Orientation', date: '' }, { name: 'Demo Day', date: '' }],
                cohortLabel: '', maxParticipants: '', eligibleStages: [], eligibilityCriteria: '',
                urlSlug: '', formTemplate: 'Standard Startup Application',
                programOwner: '', internalReviewers: [], defaultMentors: []
            })
        }
        setCurrentStep(1)
        setIsWizardOpen(true)
    }

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const toggleArrayItem = (field, value) => {
        setFormData(prev => {
            const current = prev[field]
            return {
                ...prev,
                [field]: current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value]
            }
        })
    }

    const handleMilestoneChange = (index, key, value) => {
        const newMilestones = [...formData.milestones]
        newMilestones[index][key] = value
        updateField('milestones', newMilestones)
    }

    const addMilestone = () => {
        updateField('milestones', [...formData.milestones, { name: '', date: '' }])
    }

    const handleSave = (status = 'Draft') => {
        const newProgram = {
            id: editingId || Date.now(),
            ...formData,
            status: status === 'Published' ? 'Active' : 'Draft',
            cohorts: [],
            participants: 0
        }

        if (editingId) {
            setPrograms(programs.map(p => p.id === editingId ? newProgram : p))
        } else {
            setPrograms([...programs, newProgram])
        }

        if (status === 'Published') {
            alert('Program Published! Notification sent to team.')
        }
        setIsWizardOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Program Management</h3>
                <button
                    onClick={() => handleOpenWizard()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                    <Icons.Plus />
                    <span>Create Program</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((p) => (
                    <ProgramCard
                        key={p.id}
                        program={p}
                        onSelect={onSelect}
                        onEdit={() => handleOpenWizard(p)}
                    />
                ))}
            </div>

            {/* WIZARD MODAL */}
            {isWizardOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Program' : 'Create New Program'}</h2>
                                <p className="text-sm text-gray-500">Step {currentStep} of 5: {steps[currentStep - 1].title}</p>
                            </div>
                            <button onClick={() => setIsWizardOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2">
                            <div
                                className="bg-blue-600 h-2 transition-all duration-300"
                                style={{ width: `${(currentStep / 5) * 100}%` }}
                            ></div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                                value={formData.name}
                                                onChange={e => updateField('name', e.target.value)}
                                                placeholder="e.g., Summer 2025 Accelerator"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                            <textarea
                                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                value={formData.description}
                                                onChange={e => updateField('description', e.target.value)}
                                                placeholder="Brief overview of the program..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                                                <select
                                                    className="w-full border rounded-lg p-2"
                                                    value={formData.type}
                                                    onChange={e => updateField('type', e.target.value)}
                                                >
                                                    <option>Incubator</option>
                                                    <option>Accelerator</option>
                                                    <option>Pre-incubation</option>
                                                    <option>Thematic Cohort</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Program Mode</label>
                                                <select
                                                    className="w-full border rounded-lg p-2"
                                                    value={formData.mode}
                                                    onChange={e => updateField('mode', e.target.value)}
                                                >
                                                    <option>Online</option>
                                                    <option>Offline</option>
                                                    <option>Hybrid</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Focus / Theme</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.focus}
                                                onChange={e => updateField('focus', e.target.value)}
                                                placeholder="e.g., Fintech, Climate, SaaS"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h4 className="font-semibold text-gray-900 border-b pb-2">Timeline</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Application Start</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.applicationStart}
                                                onChange={e => updateField('applicationStart', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Application End</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.applicationEnd}
                                                onChange={e => updateField('applicationEnd', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Program Start</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.programStart}
                                                onChange={e => updateField('programStart', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Program End</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.programEnd}
                                                onChange={e => updateField('programEnd', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-gray-900">Key Milestones</h4>
                                            <button onClick={addMilestone} className="text-sm text-blue-600 font-medium hover:underline">+ Add Milestone</button>
                                        </div>
                                        <div className="space-y-3">
                                            {formData.milestones.map((ms, index) => (
                                                <div key={index} className="flex gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Milestone Name"
                                                        className="flex-1 border rounded-lg p-2"
                                                        value={ms.name}
                                                        onChange={e => handleMilestoneChange(index, 'name', e.target.value)}
                                                    />
                                                    <input
                                                        type="date"
                                                        className="w-40 border rounded-lg p-2"
                                                        value={ms.date}
                                                        onChange={e => handleMilestoneChange(index, 'date', e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Cohort Label</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.cohortLabel}
                                                onChange={e => updateField('cohortLabel', e.target.value)}
                                                placeholder="e.g., Cohort 1 – 2026 Spring"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                                            <input
                                                type="number"
                                                className="w-full border rounded-lg p-2"
                                                value={formData.maxParticipants}
                                                onChange={e => updateField('maxParticipants', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Stages</label>
                                            <div className="flex flex-wrap gap-3">
                                                {['Idea', 'MVP', 'Early Revenue', 'Growth'].map(stage => (
                                                    <button
                                                        key={stage}
                                                        onClick={() => toggleArrayItem('eligibleStages', stage)}
                                                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${formData.eligibleStages.includes(stage)
                                                                ? 'bg-blue-100 border-blue-600 text-blue-700'
                                                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {stage}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                                            <textarea
                                                className="w-full border rounded-lg p-2"
                                                rows="4"
                                                value={formData.eligibilityCriteria}
                                                onChange={e => updateField('eligibilityCriteria', e.target.value)}
                                                placeholder="Describe who should apply..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                                            <div className="text-gray-500">
                                                <span className="block mb-2">Drag & drop or click to upload</span>
                                                <span className="text-xs">PNG, JPG up to 5MB</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Application URL Slug</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                accubate.com/programs/
                                            </span>
                                            <input
                                                type="text"
                                                className="flex-1 border rounded-r-lg p-2"
                                                value={formData.urlSlug}
                                                onChange={e => updateField('urlSlug', e.target.value)}
                                                placeholder="fintech-accelerator-2026"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Application Form Template</label>
                                        <select
                                            className="w-full border rounded-lg p-2"
                                            value={formData.formTemplate}
                                            onChange={e => updateField('formTemplate', e.target.value)}
                                        >
                                            <option>Standard Startup Application</option>
                                            <option>Advanced Deeptech Form</option>
                                            <option>Simple Student Form</option>
                                            <option>Custom Template...</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {currentStep === 5 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Program Owner</label>
                                        <select
                                            className="w-full border rounded-lg p-2"
                                            value={formData.programOwner}
                                            onChange={e => updateField('programOwner', e.target.value)}
                                        >
                                            <option value="">Select a user...</option>
                                            {USERS.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Internal Reviewers</label>
                                        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                                            {USERS.map(u => (
                                                <label key={u.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.internalReviewers.includes(u.id)}
                                                        onChange={() => toggleArrayItem('internalReviewers', u.id)}
                                                        className="rounded text-blue-600"
                                                    />
                                                    <span className="text-sm text-gray-700">{u.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Mentors</label>
                                        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                                            {MENTORS.map(m => (
                                                <label key={m.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.defaultMentors.includes(m.id)}
                                                        onChange={() => toggleArrayItem('defaultMentors', m.id)}
                                                        className="rounded text-blue-600"
                                                    />
                                                    <span className="text-sm text-gray-700">{m.name} - <span className="text-gray-500">{m.expertise}</span></span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-between items-center">
                            {currentStep > 1 ? (
                                <button
                                    onClick={() => setCurrentStep(curr => curr - 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium flex items-center"
                                >
                                    <ChevronLeft size={16} className="mr-1" /> Back
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            <div className="flex space-x-3">
                                {currentStep === 5 && (
                                    <button
                                        onClick={() => handleSave('Draft')}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white font-medium"
                                    >
                                        Save as Draft
                                    </button>
                                )}

                                {currentStep < 5 ? (
                                    <button
                                        onClick={() => setCurrentStep(curr => curr + 1)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
                                    >
                                        Next <ChevronRight size={16} className="ml-1" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSave('Published')}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center"
                                    >
                                        <Check size={16} className="mr-1" /> Launch Program
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}