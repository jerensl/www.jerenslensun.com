import { Grid } from '../Grid'
import { Card } from './card'
import type { IProjectMetadata } from '../../types/project'

export const Layout = ({
    project,
}: {
    project: IProjectMetadata[]
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
