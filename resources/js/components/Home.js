import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LostIDItem from "./LostIDItem";
import {Cell, Grid, Row as ReactRow} from "@material/react-layout-grid";
import '@material/react-layout-grid/dist/layout-grid.css';
import MyNavbar from "./MyNavbar";
import CenteredPageTitle from "./CenteredPageTitle";

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = { lostIDs: [], searchQuery: "" };

        this.renderGridContent = this.renderGridContent.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.fetchLostIDs = this.fetchLostIDs.bind(this);
    }

    doSearch(searchQuery) {
        console.log(searchQuery);
        this.setState({searchQuery});
        console.log(searchQuery);

        this.fetchLostIDs(searchQuery)
    }

    fetchLostIDs(searchQuery = "") {
        // Its as though the searchQuery state is not set before this method
        // is called in the doSearch method
        // console.log("fetchLostIds function", this.state.searchQuery);
        fetch(APP_URL + "/lost-and-found-ids/" + searchQuery)
            .then(res => res.json())
            .then(lostIDs => this.setState({lostIDs}))
    }

    componentDidMount() {
        this.fetchLostIDs();
    }

    renderGridContent() {
        return (
            <Grid className={"w-100"}>
                <ReactRow>
                    {this.state.lostIDs.map((lostID, i) => (
                        <Cell desktopColumns={4} tabletColumns={4} phoneColumns={4}>
                            <LostIDItem IDNumber={lostID['id_number']}
                                        finderPhoneNumber={lostID['finder_phone_number']}
                                        idImage={lostID['image']}
                            />
                        </Cell>
                    ))}
                </ReactRow>
            </Grid>
        );
    }

    render() {
        return (
            <div>
                <MyNavbar showSearchBar onSearch={this.doSearch}/>

                <Container mx-sm-1 mx-md-5>
                    {/*Centered Title*/}
                    {/*<Row className={"justify-content-center"}>
                        <div className={"mt-3"}>
                            <h1>Lost and Found IDs</h1>
                        </div>
                    </Row>*/}
                    <CenteredPageTitle title={"Lost and Found Ids"} />
                    <Row>
                        {/* Grid Comes in here */}
                        {/* <LostIDsGrid lostIDItems={... } /> */}
                        {this.renderGridContent()}
                    </Row>
                </Container>
            </div>

        );
    }
}
