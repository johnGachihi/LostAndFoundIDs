import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LostIDItem from "./LostIDItem";
import {Cell, Grid, Row as ReactRow} from "@material/react-layout-grid";
import '@material/react-layout-grid/dist/layout-grid.css';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = { lostIDs: [], searchQuery: "" };

        this.renderGridContent = this.renderGridContent.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
    }

    updateSearchQuery(searchQuery) {
        this.setState({searchQuery});
    }

    componentDidMount() {
        fetch(APP_URL + "/lost-and-found-ids/" + this.state.searchQuery)
            .then(res => res.json())
            .then(lostIDs => this.setState({lostIDs}))
    }

    renderGridContent() {
        let lostIDComponents;
        return (
            <Grid className={"w-100"}>
                <ReactRow>
                    {this.state.lostIDs.map((lostID, i) => (
                        <Cell desktopColumns={4} tabletColumns={4} phoneColumns={4}>
                            <LostIDItem IDNumber={lostID['id_number']}
                                        finderPhoneNumber={lostID['finder_phone_number']}/>
                        </Cell>
                    ))}
                </ReactRow>
            </Grid>
        );
    }

    render() {
        // console.log(this.state.lostIDs);
        this.props.showSearchBar(true);
        console.log(window.location.pathname);
        return (
            <Container mx-sm-1 mx-md-5>
                <Row className={"justify-content-center"}>
                    <div className={"mt-3"}>
                        <h1>Lost and Found IDs</h1>
                    </div>
                </Row>
                <Row>
                    {/* Grid Comes in here */}
                    {/* <LostIDsGrid lostIDItems={... } /> */}
                    {this.renderGridContent()}
                    {/*<LostIDItem IDNumber={100676} finderPhoneNumber={"0722 345 210"}/>*/}
                </Row>
            </Container>
        );
    }
}
