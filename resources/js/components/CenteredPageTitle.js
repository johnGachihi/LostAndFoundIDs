import React from "react";
import Row from "react-bootstrap/Row";

export default class CenteredPageTitle extends React.Component{
    render() {
        return (
            <Row className={"justify-content-center"}>
                <div className={"mt-3"}>
                    <h1>{this.props.title}</h1>
                </div>
            </Row>
        )
    }
}
