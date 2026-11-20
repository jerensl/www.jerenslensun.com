export interface IResumeProfile {
    name: string
    headline: string
    location: string
    availability: string
    email: string
    website: string
}

export interface ISkillGroup {
    label: string
    skills: string[]
}

export interface IEducation {
    institution: string
    credential: string
    period: string
    location?: string
}

export interface IResumeProject {
    slug: string
    title: string
    description: string
    tags: string[]
}

export const resumeProfile: IResumeProfile = {
    name: 'Jerens S. Lensun',
    headline: 'Software Engineer — Browser Engines & Developer Tooling',
    location: 'Indonesia (UTC+7)',
    availability: 'Open to full-time roles — remote or relocation',
    email: 'jerensslensun@gmail.com',
    website: 'https://jerensl.dev',
}

export const resumeSummary =
    'Software engineer working inside Servo, the Rust browser engine, across script bindings, DOM, IndexedDB, DevTools, and developer tooling. I work where web standards meet implementation: making an engine easier to change, test, and ship. Previously an LFX Mentee at CNCF’s Meshery project, building Playwright end-to-end coverage and CI reporting.'

export const resumeHighlights = [
    'Outreachy intern: rebuilt Servo’s lint and type-check pipeline with GitHub Actions annotations, mach, Ruff, and Pyrefly.',
    'Added type annotations across Servo’s Python codebase, including the Web IDL codegen.',
    'Expanded Meshery’s Playwright end-to-end suite and added self-documenting CI reports as an LFX Mentee.',
    'Continued contributing to Servo across script bindings, DOM, IndexedDB, and DevTools.',
]

export const skillGroups: ISkillGroup[] = [
    {
        label: 'Languages',
        skills: ['Rust', 'TypeScript', 'JavaScript', 'Python', 'HTML/CSS'],
    },
    {
        label: 'Browser & Web',
        skills: [
            'Servo',
            'DOM',
            'IndexedDB',
            'Web IDL',
            'Web Platform Tests',
            'DevTools',
        ],
    },
    {
        label: 'Testing & CI',
        skills: [
            'Playwright',
            'Jest',
            'GitHub Actions',
            'Ruff',
            'Pyrefly',
            'lint & type-check tooling',
        ],
    },
    {
        label: 'Cloud & Tooling',
        skills: ['Kubernetes', 'Meshery', 'CNCF', 'Git', 'Linux'],
    },
]

export const featuredProjectSlugs: string[] = [
    'servo',
    'meshery',
    'personal-web-app',
]

// Add your education here. The Education section is hidden while this stays empty.
export const education: IEducation[] = []

export const resumeLastUpdated = 'November 2026'
