import ProvidersManager from '../components/ProvidersManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";


const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
        },
    }),
    withProps(props => {
        return {modalTitle: 'Select an Action',modalFooter:false}
    }),
    withModal
);

export default enhance(ProvidersManager);