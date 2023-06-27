import { ProjectMetadata } from '../../lib/project'
import { Grid } from '../Grid'
import { Card } from './card'

export const Layout = ({
    project,
}: {
    project: ProjectMetadata[]
}): React.ReactElement => {
    return (
        <Grid as="section" rowGap>
            {project?.length ? null : (
                <p className="col-span-full text-center">
                    No project available.
                </p>
            )}
            {project?.map(Card)}
        </Grid>
    )
}
