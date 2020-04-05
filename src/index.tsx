import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from './store'
import Immutable from 'immutable'

const state = {
    name: "QF",
    courses: ['h5', 'java', 'javascript']
}

const imState = Immutable.Map(state);

const list = [1, 2];
const listIm1 = Immutable.List(list);
const listIm2 = list.push(3, 4, 5);

const stateIm = Immutable.fromJS(state);

console.log(stateIm.getIn(['courses', 1]))


const newStateIm = stateIm.setIn(['courses'], 'c#')
console.log(newStateIm.get)


ReactDOM.render(
    <Fragment>
        <App/>
    </Fragment>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
