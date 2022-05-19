import { ProjectMetadata } from '../../context/project'
import { Card } from './Card'

export const Layout = ({
    project,
}: {
    project: ProjectMetadata[]
}): React.ReactElement => {
    return (
        <section className="flex flex-wrap gap-5 justify-center">
            {project.length ? null : <p>No project available.</p>}
            {project?.map(Card)}
        </section>
    )
}
