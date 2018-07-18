import Assessment from '../components/Assessment/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../../../components/Modal/index";


const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            // props.form.validateFields((err, values) => {
            //     console.log(err);
            //     console.log(values);
            // if (!err) {
            //     console.log(values);
            //     props.onHide();
            //     // props.onSubmit(values).then(({data})=> {
            //     //     props.onHide();
            //     // });
            // }
            // });
        },
    }),
    withProps(props => {
        return {modalTitle: 'Who is filling this assessment out?'}
    }),
    withModal
);

export default enhance(Assessment);