import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import Navbar from "react-bootstrap/Navbar";


export default class MyNavbar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {searchQuery: ''};

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchQueryInputChange = this.handleSearchQueryInputChange.bind(this)
    }

    handleSearch(e) {
        console.log("clicked");
        this.props.onSearch(this.state.searchQuery);
        e.preventDefault();
    }

    handleSearchQueryInputChange(e) {
        this.setState({searchQuery: e.target.value});
        e.preventDefault();
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" className={"justify-content-between"}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*{React.Children.map(this.props.children, child => <Nav.Link>{child}</Nav.Link>)}*/}
                        <Nav.Link><Link to={"/"}>Home</Link></Nav.Link>
                        <Nav.Link><Link to={'/upload'}>Upload An ID</Link></Nav.Link>
                    </Nav>
                    {/*<Navbar.Brand>Lost And Found Ids</Navbar.Brand>*/}
                    {this.props.showSearchBar &&
                    <Form inline onSubmit={this.handleSearch}>
                        <FormControl type="text" placeholder="Search ID Number" className="mr-sm-2" onChange={this.handleSearchQueryInputChange} />
                        <Button type={"submit"} variant="outline-primary">Search</Button>
                    </Form>}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
