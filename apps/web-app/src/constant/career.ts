export interface ICareers {
    organization: string
    role: string
    summary: string
    startDate: string
    endDate: string
    location?: string
    highlights?: string[]
    tech?: string[]
}

export const Careers: Array<ICareers> = [
    {
        organization: 'Servo',
        role: 'Outreachy Intern — Improve code linting in Servo’s CI',
        summary:
            'Improved Servo’s linting and type-checking pipeline with GitHub Actions annotations, mach, Ruff, and Pyrefly, adding type annotations across the Python codebase including the Web IDL codegen. After the internship, continued as an open-source contributor across script bindings, DOM, IndexedDB, and DevTools.',
        startDate: 'June 2025',
        endDate: 'August 2025',
        location: 'Remote',
        highlights: [
            'Improved Servo’s lint and type-check pipeline with GitHub Actions annotations, mach, Ruff, and Pyrefly.',
            'Added type annotations across the Python codebase, including the Web IDL codegen.',
            'Continued as a contributor across script bindings, DOM, IndexedDB, and DevTools.',
        ],
        tech: [
            'Rust',
            'Python',
            'GitHub Actions',
            'Ruff',
            'Pyrefly',
            'Web IDL',
        ],
    },
    {
        organization: 'Meshery',
        role: 'LFX Mentee (CNCF) — Meshery: End-to-End Testing with Playwright',
        summary:
            'Worked on Meshery’s Playwright E2E suite: added self-documenting test reports to GitHub Actions, expanded local-provider and performance coverage, and documented the contributor testing workflow. LFX Mentorship, 2024 Term 3.',
        startDate: 'September 2024',
        endDate: 'November 2024',
        location: 'Remote',
        highlights: [
            'Added self-documenting test reports to GitHub Actions for faster failure triage.',
            'Expanded local-provider and performance coverage in the Playwright E2E suite.',
            'Documented the contributor testing workflow for the Meshery community.',
        ],
        tech: [
            'Playwright',
            'JavaScript',
            'GitHub Actions',
            'Kubernetes',
            'Meshery',
        ],
    },
    {
        organization: 'SoftwareSeni',
        role: 'ReactJS Developer Intern',
        summary:
            'Frontend internship building and maintaining ReactJS application features.',
        startDate: 'August 2022',
        endDate: 'October 2022',
        location: 'Indonesia',
        highlights: [
            'Built and maintained ReactJS application features during a frontend internship.',
        ],
        tech: ['React', 'JavaScript', 'HTML/CSS'],
    },
]
