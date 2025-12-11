import React, { useState } from 'react'
import ProgramSubnav from './setup/ProgramSubnav'
import ProgramList from './setup/ProgramList'
import ProgramDashboard from './setup/ProgramDashboard'
import CohortList from './setup/CohortList'
import PipelineList from './setup/PipelineList'
import PipelineBoard from './setup/PipelineBoard'
import Users from './setup/sections/Users'
import Directory from './setup/sections/Directory'
import Mail from './setup/sections/Mail'
import Form from './setup/sections/Form'
import Groups from './setup/sections/groups'
import Partnership from './setup/sections/Partnership'
import SiteSettings from './setup/sections/SiteSettings'
import SiteUsage from './setup/sections/Siteusage'
import Payments from './setup/sections/Payments'
import { seed } from './setup/data'

function Setup() {
    const [programs, setPrograms] = useState(seed.programs)
    const [active, setActive] = useState('Programs')
    const [selectedProgram, setSelectedProgram] = useState(null)
    const [selectedCohort, setSelectedCohort] = useState(null)
    const [selectedPipeline, setSelectedPipeline] = useState(null)

    const resetToPrograms = () => {
        setSelectedPipeline(null)
        setSelectedCohort(null)
        setSelectedProgram(null)
    }

    // Helper to ensure the right drill-down context for Cohorts/Pipeline
    const ensureProgramSelected = (p) => {
        if (!selectedProgram && p) setSelectedProgram(p)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <ProgramSubnav active={active} onChange={(v) => {
                    setActive(v)
                    // reset drill-down when changing sections
                    if (v !== 'Pipeline') setSelectedPipeline(null)
                    if (v !== 'Cohorts' && v !== 'Pipeline') {
                        setSelectedCohort(null)
                        setSelectedProgram(null)
                    }
                }} />

                <div className="mb-4">
                    {(selectedProgram || selectedCohort || selectedPipeline) && (
                        <button onClick={resetToPrograms} className="text-sm text-blue-600 hover:underline">
                            Clear selection
                        </button>
                    )}
                </div>

                {active === 'Users' && <Users programs={programs} />}
                {active === 'Directory' && <Directory />}
                {active === 'Mail' && <Mail />}
                {active === 'Form' && <Form />}
                {active === 'Groups' && <Groups />}
                {active === 'Partnership' && <Partnership />}
                {active === 'Site Settings' && <SiteSettings />}
                {active === 'Site Usage' && <SiteUsage />}
                {active === 'Payments' && <Payments />}

                {active === 'Programs' && !selectedProgram && (
                    <ProgramList
                        programs={programs}
                        onSelect={(p) => {
                            setSelectedProgram(p)
                            setSelectedCohort(null)
                            setSelectedPipeline(null)
                        }}
                    />
                )}

                {active === 'Programs' && selectedProgram && (
                    <ProgramDashboard
                        program={selectedProgram}
                        onBack={() => setSelectedProgram(null)}
                    />
                )}

                {active === 'Cohorts' && (
                    !selectedProgram ? (
                        <ProgramList
                            programs={programs}
                            onSelect={(p) => {
                                setSelectedProgram(p)
                                setSelectedCohort(null)
                                setSelectedPipeline(null)
                            }}
                        />
                    ) : (
                        <CohortList
                            program={selectedProgram}
                            onSelect={(c) => {
                                setSelectedCohort(c)
                                setSelectedPipeline(null)
                            }}
                        />
                    )
                )}

                {active === 'Pipeline' && (
                    !selectedProgram ? (
                        <ProgramList
                            programs={programs}
                            onSelect={(p) => {
                                setSelectedProgram(p)
                                setSelectedCohort(null)
                                setSelectedPipeline(null)
                            }}
                        />
                    ) : !selectedCohort ? (
                        <CohortList
                            program={selectedProgram}
                            onSelect={(c) => {
                                setSelectedCohort(c)
                                setSelectedPipeline(null)
                            }}
                        />
                    ) : !selectedPipeline ? (
                        <PipelineList
                            cohort={selectedCohort}
                            onSelect={(pl) => setSelectedPipeline(pl)}
                        />
                    ) : (
                        <PipelineBoard cohort={selectedCohort} pipeline={selectedPipeline} />
                    )
                )}
            </div>
        </div>
    )
}

export default Setup