import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LostIDItem from "./LostIDItem";

export default class Home extends React.Component{
    render() {
        return (
            <Container>
                <Row className={"justify-content-md-center"}>
                    <div className={"mt-3"}>
                        <h1>Lost and Found IDs</h1>
                    </div>
                </Row>
                <Row>
                    <LostIDItem IDNumber={100676} finderPhoneNumber={"0722 345 210"}/>
                </Row>
            </Container>
        );
    }
}
