import React from 'react';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import TransitionManager from '../../../../containers/TransitionManager';
import { Tooltip } from 'antd';
import { AddEditButton } from '../../../../../../../../../../components/UI/AddEditButton';


const TransitionManagerButtonPure = props => {
    const { showModal, toggleModal, asMenuItem = false,  ...otherProps } = props;
    const {transition} = props;

    const buttonOpts = {};
    if (transition) {
        if (asMenuItem) {
            buttonOpts.label = 'Edit';
        } else {
            buttonOpts.icon = 'edit';
        }
       
    } else {
        buttonOpts.icon = 'plus';
        buttonOpts.button = true;
    }
	return (
		<React.Fragment>
            {showModal && <TransitionManager {...otherProps} onHide={toggleModal} />}
            <AddEditButton {...buttonOpts} onClick={toggleModal} />
            {/* <Tooltip title={reminderText}><span onClick={toggleModal} >{reminderText}</span></Tooltip> */}
		</React.Fragment>
	);

}

const TransitionManagerButton = withToggleModal(TransitionManagerButtonPure);

export default TransitionManagerButton;

