// libraries
import { Grid, GridCell } from '@rmwc/grid';
// types
import { FunctionalComponent } from 'preact';

const PageLayout: FunctionalComponent = ({ children }) => (
  <>
    <Grid>
      <GridCell desktop={4} tablet={1} phone={0}></GridCell>
      <GridCell desktop={4} tablet={6} phone={4}>
        <main>{children}</main>
      </GridCell>
      <GridCell desktop={4} tablet={1} phone={0}></GridCell>
    </Grid>
  </>
);

export default PageLayout;
