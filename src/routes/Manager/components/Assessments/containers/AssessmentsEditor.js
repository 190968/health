import AssessmentsManager from '../components/AssessmentsManager/index';
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
        return {modalTitle: 'What would you like to create?',modalFooter:false}
    }),
    withModal
);

export default enhance(AssessmentsManager);