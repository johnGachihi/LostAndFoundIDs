import React from "react";
import Form from "react-bootstrap/Form";

export default class MyFormControl extends React.Component {
    render() {
        return (
            <Form.Group>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    isInvalid={this.props.isValid}
                />
                <Form.Control.Feedback type={"invalid"}>
                    {this.props.error}
                </Form.Control.Feedback>
            </Form.Group>
        );
    }
}
