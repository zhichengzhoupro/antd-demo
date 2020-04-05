import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {mainRoutes} from './routers/Router'
import Admin from "./views/admin/Admin";
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Provider} from "react-redux";
import store from "./store";

function App() {
    return (
        <Fragment>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path={'/admin'} render={(routeProps) => {
                            return <Admin {...routeProps}></Admin>
                        }}></Route>
                        {
                            mainRoutes.map(route => {
                                return <Route key={route.pathName} path={route.pathName}
                                              component={route.component}></Route>
                            })
                        }
                        <Redirect to="/admin" from="/" exact></Redirect>
                        <Redirect to="/404"></Redirect>
                    </Switch>
                </Router>
            </Provider>
        </Fragment>
    );
}

export default App;
