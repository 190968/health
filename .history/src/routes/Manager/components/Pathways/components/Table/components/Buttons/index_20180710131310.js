import React from 'react';
import { compose, withState, withHandlers } from 'recompose';


cosnt PathwayFlowButtonPure = props => {
    const {openModal, toggleModal} = props;
    return <React.Fragment>
        <span><Icon type="flow"/> View Flow</span
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