import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import MyNavbar from "./MyNavbar";
import Home from "./Home";

export default function Main() {
    return (
        <Router basename={"index.php"}>
            <div>
                <MyNavbar>
                    <Link to={"/"}>Home</Link>
                    <Link to={'/upload'}>Upload An ID</Link>
                </MyNavbar>

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

function Upload() {
    return (
        <div>
            <h1>Upload</h1>
        </div>
    )
}

// function Home() {
//     return (
        {/*<h1>Home</h1>*/}
    // )
// }
