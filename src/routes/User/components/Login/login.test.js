/**
 * Created by Павел on 05.02.2018.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import Login from './index';
describe('<Login>', () => {
    it('renders without crashing', () => {
        console.log("<Login> ----> Done")
        const div = document.createElement('div');
        let component = w
        ReactDOM.render(<Login />,div);
        ReactDOM.unmountComponentAtNode(div);
    })
})