import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import MyNavbar from "./MyNavbar";
import Home from "./Home";
import Upload from "./Upload";

export default class Main extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename={"index.php"}>
                <div>
                    <Switch>
                        <Route path={"/upload"}>
                            <Upload/>
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
