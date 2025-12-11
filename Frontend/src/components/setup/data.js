// Seed data expressing Program -> Cohort(s) -> Pipeline(s) -> Stage(s)
export const seed = {
    programs: [
        {
            id: 1,
            name: 'Startup Incubator 2025',
            status: 'Active',
            participants: 25,
            startDate: '2025-01-15',
            endDate: '2025-12-31',
            cohorts: [
                {
                    id: 11,
                    name: 'Cohort A - Q1 2025',
                    status: 'Active',
                    startDate: '2025-01-15',
                    pipelines: [
                        {
                            id: 111,
                            name: 'Enquiry Stage',
                            stages: [
                                { id: 1111, name: 'Add Application', info: 'Attach application form template', status: 'Enabled' },
                                { id: 1112, name: 'Onboarding Email', info: 'Send login credentials', status: 'Enabled' },
                                { id: 1113, name: 'Onboarding SMS', info: 'Optional SMS credentials', status: 'Disabled' },
                                { id: 1114, name: 'Submission Email', info: 'Mail on form submit', status: 'Enabled' }
                            ]
                        }
                    ]
                },
                {
                    id: 12,
                    name: 'Cohort B - Q2 2025',
                    status: 'Planning',
                    startDate: '2025-04-01',
                    pipelines: [
                        {
                            id: 121,
                            name: 'Enquiry Stage',
                            stages: [
                                { id: 1211, name: 'Add Application', info: 'Attach application form template', status: 'Enabled' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Mentorship Program',
            status: 'Active',
            participants: 18,
            startDate: '2025-02-01',
            endDate: '2025-11-30',
            cohorts: []
        },
        {
            id: 3,
            name: 'Innovation Workshop',
            status: 'Planning',
            participants: 0,
            startDate: '2025-03-01',
            endDate: '2025-03-15',
            cohorts: []
        }
    ]
}