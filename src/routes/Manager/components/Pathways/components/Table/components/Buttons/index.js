import React from 'react';
import {Icon} from 'antd';
import PathwayFlow from '../../../../containers/PathwayFlow.js';
import { compose, withState, withHandlers } from 'recompose';


const PathwayFlowButtonPure = props => {
    const {openModal, toggleModal, pathway} = props;
    return <React.Fragment>
        <a onClick={toggleModal}>{/*<Icon type="eye-o" />*/} View Flow</a>
        {openModal && <PathwayFlow pathway={pathway} onHide={toggleModal} />}
        </React.Fragment>
}

const enhance = compose(
    withState('openModal','setOpenModal', false),
    withHandlers({
        toggleModal: props=> () => {
            props.setOpenModal(!props.openModal);
        }
    })
)
export const PathwayFlowButton = enhance(PathwayFlowButtonPure);