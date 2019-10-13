import React from "react";

import {Cell, Grid, Row} from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

export default class LostIDsGrid extends React.Component{

    render() {
        return (
            <Grid>
                {this.props.children}
            </Grid>
        )
    }
}
