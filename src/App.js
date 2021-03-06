import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>

                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={"/profile/"}/> } />

                            <Route path="/dialogs"
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?"
                                   render={withSuspense(ProfileContainer)}/>
                            <Route path="/users"
                                   render={() => <UsersContainer/>}/>

                            <Route path="/login/facebook"
                                   render={() => <div>Facebook login</div>}/>
                            <Route path="/login"
                                   render={() => <Login/>}/>

                            <Route path="*"
                                   render={() => <div>404 not found</div>}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, {initializeApp})(App);

