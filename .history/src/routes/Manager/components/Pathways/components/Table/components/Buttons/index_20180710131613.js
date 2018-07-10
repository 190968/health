import React from 'react';
import { compose, withState, withHandlers } from 'recompose';


const PathwayFlowButtonPure = props => {
    const {openModal, toggleModal, pathway} = props;
    return <React.Fragment>
        <span onClick={toggleModal}><Icon type="flow"/> View Flow</span>
        {openModal && <PathwayFlow pathway={pathway} />}
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