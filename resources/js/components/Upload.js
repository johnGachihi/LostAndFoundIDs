import React from "react";
import MyNavbar from "./MyNavbar";
import Container from "react-bootstrap/Container";
import CenteredPageTitle from "./CenteredPageTitle";
import {Row} from "react-bootstrap";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import {Formik} from "formik";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "@material/react-dialog/dist/dialog.css";

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from '@material/react-dialog';
import {BASE_URL} from "../constants/constants";

export default class Upload extends React.Component{
    constructor(props) {
        super(props);

        this.state = { dialogOpen: false }
    }

    render() {
        return (
            <div>
                <MyNavbar />

                <Container>
                    <CenteredPageTitle title={"Upload Found ID"} />

                    <Row className={"justify-content-center mt-4"}>
                        <Col sm={10} md={6} lg={4}>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={{
                                    idNumber: '123456',
                                    idImage: '',
                                    phoneNumberToBeCalled: '1234567890',
                                    placeFound: 'ghjkl',
                                    uploaderEmail: 'tyui@gmail.com'
                                }}
                                onSubmit={((values, formikActions) => {
                                    console.log(values);
                                    postData(BASE_URL + "/upload-lost-id/uploader-email", values)
                                        .then(res => {
                                            console.log(res);
                                            this.setState({dialogOpen: true})
                                        });
                                })}
                            >
                                {({
                                      handleSubmit,
                                      handleChange,
                                      handleBlur,
                                      values,
                                      touched,
                                      isValid,
                                      errors,
                                  }) => (
                                    <Form noValidate onSubmit={handleSubmit} className={"w-100"}>
                                        <Form.Group>
                                            <Form.Label>ID Number</Form.Label>
                                            <Form.Control
                                                type={"text"}
                                                name={"idNumber"}
                                                value={values.idNumber}
                                                onChange={handleChange}
                                                isInvalid={!!errors.idNumber && touched.idNumber}
                                            />
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.idNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>ID Image</Form.Label>
                                            <Form.Control
                                                type={"file"}
                                                name={"idImage"}
                                                value={values.idImage}
                                                onChange={handleChange}
                                                isInvalid={!!errors.idImage && touched.idImage}
                                            />
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.idImage}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Phone number to be called</Form.Label>
                                            <Form.Control
                                                type={"text"}
                                                name={"phoneNumberToBeCalled"}
                                                value={values.phoneNumberToBeCalled}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phoneNumberToBeCalled && touched.phoneNumberToBeCalled}
                                            />
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.phoneNumberToBeCalled}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Place Found</Form.Label>
                                            <Form.Control
                                                type={"text"}
                                                name={"placeFound"}
                                                value={values.placeFound}
                                                onChange={handleChange}
                                                isInvalid={!!errors.placeFound && touched.placeFound}
                                            />
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.placeFound}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Uploader email</Form.Label>
                                            <Form.Control
                                                type={"text"}
                                                name={"uploaderEmail"}
                                                value={values.uploaderEmail}
                                                onChange={handleChange}
                                                isInvalid={!!errors.uploaderEmail && touched.uploaderEmail}
                                            />
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.uploaderEmail}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/*<MyFormControl
                                            label={"Uploader's email"}
                                            type={"text"}
                                            name={"uploaderEmail"}
                                            value={values.uploaderEmail}
                                            onChange={handleChange}
                                            isInvalid={!!errors.uploaderEmail && touched.uploaderEmail}
                                            error={errors.uploaderEmail}
                                        />*/}

                                        <Button type={"submit"} block>Upload</Button>

                                    </Form>
                                )}
                            </Formik>
                        </Col>

                    </Row>
                </Container>

                <Dialog open={this.state.dialogOpen} onClose={() => this.setState({dialogOpen: false})}>
                    <DialogTitle>My Dialog</DialogTitle>
                    <DialogContent>
                        <input type={"text"} />
                    </DialogContent>
                    <DialogFooter>
                        <DialogButton action='dismiss'>Dismiss</DialogButton>
                        <DialogButton action='accept' isDefault>Accept</DialogButton>
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    idNumber: Yup.number()
        .typeError("Insert valid ID number")
        .min(4, "Insert valid ID number")
        .required("Required"),
    idImage: Yup.mixed().required("Required"),
    phoneNumberToBeCalled: Yup.string()
        .matches(phoneRegExp, "Insert a valid phone number")
        .required("Required"),
    placeFound: Yup.string().required("Required"),
    uploaderEmail: Yup.string()
        .email("Insert valid email")
        .required("Required")
});


async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json()
}
