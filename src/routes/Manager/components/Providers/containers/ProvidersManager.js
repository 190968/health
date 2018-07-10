import ProvidersManager from '../components/ProvidersManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose,withState, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";

const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withState('visibleModalExesting', 'setOpenManagerExesting', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        },
        openModalExesting: props => () => {
            props.setOpenManagerExesting(true);
        },
        hideModalExesting: props => () => {
            props.setOpenManagerExesting(false);
        }
    }),
    withProps(props => {
        return {modalTitle: 'Select an Action', modalFooter:false}
    }),
    withModal
);

export default enhance(ProvidersManager);