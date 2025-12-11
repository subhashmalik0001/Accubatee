import React, { useState } from 'react'
import { Plus, X, Upload, Check, MoreVertical } from 'lucide-react'

export default function Users({ programs = [] }) {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'Active',
            programs: ['All']
        }
    ])
    const [isAdding, setIsAdding] = useState(false)
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        passwordType: 'invite', // 'invite' or 'manual'
        password: '',
        photo: null,
        status: 'Invited',
        primaryRole: 'Program Manager',
        additionalRoles: [],
        assignAllPrograms: false,
        assignedPrograms: []
    })

    const roles = {
        primary: [
            'Incubation Manager',
            'Program Manager',
            'Mentor',
            'Investor',
            'Admin'
        ],
        additional: [
            'Mentor',
            'Investor',
            'Reviewer / Evaluator',
            'Support / Read-only'
        ]
    }

    const handleRoleChange = (role) => {
        setNewUser({ ...newUser, primaryRole: role })
    }

    const toggleAdditionalRole = (role) => {
        const current = newUser.additionalRoles
        if (current.includes(role)) {
            setNewUser({ ...newUser, additionalRoles: current.filter(r => r !== role) })
        } else {
            setNewUser({ ...newUser, additionalRoles: [...current, role] })
        }
    }

    const toggleProgram = (progId) => {
        const current = newUser.assignedPrograms
        if (current.includes(progId)) {
            setNewUser({ ...newUser, assignedPrograms: current.filter(p => p !== progId) })
        } else {
            setNewUser({ ...newUser, assignedPrograms: [...current, progId] })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsers([
            ...users,
            {
                id: Date.now(),
                ...newUser,
                role: newUser.primaryRole,
            }
        ])
        setIsAdding(false)
        setNewUser({
            name: '',
            email: '',
            phone: '',
            passwordType: 'invite',
            password: '',
            photo: null,
            status: 'Invited',
            primaryRole: 'Program Manager',
            additionalRoles: [],
            assignAllPrograms: false,
            assignedPrograms: []
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Users</h3>
                    <p className="text-sm text-gray-500">Manage team members and their access levels</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    <span>Add User</span>
                </button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add New User</h2>
                            <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-8">
                            {/* Basic Fields */}
                            <section className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={newUser.name}
                                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={newUser.email}
                                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={newUser.phone}
                                            onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={newUser.status}
                                            onChange={e => setNewUser({ ...newUser, status: e.target.value })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Invited">Invited</option>
                                            <option value="Suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Password / Access</label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="passwordType"
                                                checked={newUser.passwordType === 'invite'}
                                                onChange={() => setNewUser({ ...newUser, passwordType: 'invite' })}
                                                className="text-blue-600"
                                            />
                                            <span className="text-sm">Send invite link</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="passwordType"
                                                checked={newUser.passwordType === 'manual'}
                                                onChange={() => setNewUser({ ...newUser, passwordType: 'manual' })}
                                                className="text-blue-600"
                                            />
                                            <span className="text-sm">Set password manually</span>
                                        </label>
                                    </div>
                                    {newUser.passwordType === 'manual' && (
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            className="w-full md:w-1/2 border rounded-lg p-2"
                                            value={newUser.password}
                                            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                        />
                                    )}
                                </div>
                            </section>

                            <div className="border-t pt-6"></div>

                            {/* Roles */}
                            <section className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Role & Access</h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Primary Role <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {roles.primary.map(role => (
                                            <label key={role} className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${newUser.primaryRole === role ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                                                <input
                                                    type="radio"
                                                    name="primaryRole"
                                                    value={role}
                                                    checked={newUser.primaryRole === role}
                                                    onChange={() => handleRoleChange(role)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span className="ml-2 text-sm font-medium">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Additional Roles</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {roles.additional.map(role => (
                                            <label key={role} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={newUser.additionalRoles.includes(role)}
                                                    onChange={() => toggleAdditionalRole(role)}
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <span className="ml-2 text-sm font-medium">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <div className="border-t pt-6"></div>

                            {/* Program Assignment */}
                            <section className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Program Assignment</h4>

                                <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newUser.assignAllPrograms}
                                        onChange={e => setNewUser({
                                            ...newUser,
                                            assignAllPrograms: e.target.checked,
                                            assignedPrograms: e.target.checked ? [] : []
                                        })}
                                        className="w-5 h-5 text-blue-600 rounded"
                                    />
                                    <div>
                                        <span className="block text-sm font-medium text-gray-900">All Programs</span>
                                        <span className="block text-xs text-gray-500">User will have access to all current and future programs</span>
                                    </div>
                                </label>

                                {!newUser.assignAllPrograms && (
                                    <div className="ml-7 space-y-2">
                                        <p className="text-sm text-gray-500 mb-2">Or select specific programs:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {programs.map(prog => (
                                                <label key={prog.id} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={newUser.assignedPrograms.includes(prog.id)}
                                                        onChange={() => toggleProgram(prog.id)}
                                                        className="w-4 h-4 text-blue-600 rounded"
                                                    />
                                                    <span className="ml-2 text-sm">{prog.name}</span>
                                                </label>
                                            ))}
                                            {programs.length === 0 && (
                                                <p className="text-sm text-gray-400 italic">No programs available to assign.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Footer Actions */}
                            <div className="sticky bottom-0 bg-white pt-6 border-t flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.role}</div>
                                    {user.additionalRoles && user.additionalRoles.length > 0 && (
                                        <div className="text-xs text-gray-500">
                                            + {user.additionalRoles.length} others
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.assignAllPrograms ? 'All Programs' : (
                                        user.assignedPrograms?.length > 0
                                            ? `${user.assignedPrograms.length} Programs`
                                            : (Array.isArray(user.programs) ? user.programs.join(', ') : 'None')
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            user.status === 'Backlog' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}