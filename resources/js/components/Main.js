import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import MyNavbar from "./MyNavbar";
import Home from "./Home";

export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {showSearchBar: false};
        this.onSetShowSearchBar = this.onSetShowSearchBar.bind();
    }

    onSetShowSearchBar(show) {
        this.setState({showSearchBar: show})
    }

    render() {
        return (
            <Router basename={"index.php"}>
                <div>
                    <MyNavbar showSearchBar={this.state.showSearchBar}>
                        <Link to={"/"}>Home</Link>
                        <Link to={'/upload'}>Upload An ID</Link>
                    </MyNavbar>

                    <Switch>
                        <Route path={"/upload"}>
                            <Upload/>
                        </Route>
                        <Route path="/">
                            <Home setShowSearchBar={this.onSetShowSearchBar}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

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
