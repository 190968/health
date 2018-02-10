/**
 * Created by Павел on 05.02.2018.
 */
import React from 'react';
import {shallow ,mount } from 'enzyme';
import Login from './index';
const wrapperFunc = (props) => {
    return mount(<Login {...props} />);
};
describe('<Login>', () => {
    const setup = () => {
        const correctlyLogin =
        {
            email: 'demco2patient@fitango.com',
            password: 'Fitango2'
        };
        const LoanReview = wrapperFunc(correctlyLogin);
        return {
            correctlyLogin,
            LoanReview
        };
    };
    it('renders without crashing', () => {
        console.log("<Login> ----> Done")
        // const div = document.createElement('div');
        // let component = withRouter(div);
        // ReactDOM.render(<Login />,component);
        // ReactDOM.unmountComponentAtNode(div);
    })

    it('correct data input', () => {
        const {
            correctlyLogin, LoanReview
        } = setup();

        const data = {
            email: correctlyLogin.email,
            password: correctlyLogin.password
        };

         let loginForm = LoanReview.find("#submitForm");

        loginForm.props().onSubmit();

        //expect(LoanReview.state('email')).toEqual(data);
        // const wrapper = shallow(<Login />);
        // console.log( wrapper.dive().instance().Test("PAsha"))
        // console.log(wrapper.state("pasha"));
        // expect(LoanReview.state('email')).toEqual(correctlyLogin.email);
        // expect(LoanReview.state('password')).toEqual(correctlyLogin.password);


        // let submitButton = LoanReview.find("#submitButton");
        // expect(submitButton.length).toEqual(1);
        // submitButton.simulate("click");
        //expect(LoanReview.state('formData')).toEqual(data);
        // const wrapper = shallow(<Login />);
        // wrapper.getElements()[0].setFieldsValue(correctlyLogin);
      // wrapper.dive().instance().handleSubmit()

    })
    // it('incorrect data input', () => {
    //     console.log("VAlid ----> Done")
    //     let incorrectlyLogin =
    //     {
    //         email: 'pgutzuf@fitango.com',
    //         password: 'Fita3ngo21'
    //     };
    //
    // })
})