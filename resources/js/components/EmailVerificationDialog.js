import React from "react";
import Dialog, {DialogButton, DialogContent, DialogFooter, DialogTitle} from "@material/react-dialog";
import LinearProgress from '@material/react-linear-progress';
import '@material/react-linear-progress/dist/linear-progress.css';
import '@material/react-text-field/dist/text-field.css';
import TextField, {Input} from '@material/react-text-field';
import {Form} from "react-bootstrap";

export default class EmailVerificationDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {token: ''}
    }

    render() {
        let dialogBody;
        console.log(this.state.token);
        if (this.props.status === 'loading') {
            dialogBody = (
                <div>
                    <DialogContent>Sending verification token to your email...</DialogContent>
                    <LinearProgress indeterminate={true}/>
                </div>
            )
        } else if (this.props.status === 'input' || this.props.status === 'failure') {
            dialogBody = (
                <div>
                    {/*<DialogTitle>My Dialog</DialogTitle>*/}
                    <DialogContent>
                        <p>A verification token has been sent to your email. Please insert it below.</p>
                        {/*<TextField label={"Token"} outlined>
                            <Input
                                value={this.state.token}
                                onChange={(e) => this.setState({token: e.currentTarget.value})}
                            />
                        </TextField>*/}
                        <Form.Group>
                            <Form.Control
                                type={"text"}
                                value={this.state.token}
                                onChange={(e) => this.setState({token: e.currentTarget.value})}
                                placeholder={"Insert token here"}
                                isInvalid={this.props.status === "failure"}
                            />
                            <Form.Control.Feedback type={"invalid"}>Invalid token</Form.Control.Feedback>
                        </Form.Group>
                    </DialogContent>
                    <DialogFooter>
                        <DialogButton action='dismiss'>Dismiss</DialogButton>
                        <DialogButton isDefault
                                      onClick={(e) => this.props.onClickAccept(this.state.token)}>Accept</DialogButton>
                    </DialogFooter>
                </div>
            )
        } else if (this.props.status === 'success') {
            dialogBody = (
                <DialogContent>Upload Successful</DialogContent>
            )
        }
        return (
            <Dialog open={this.props.dialogOpen} onClose={this.props.onDialogClose}>
                {dialogBody}
            </Dialog>
        );
    }
}
