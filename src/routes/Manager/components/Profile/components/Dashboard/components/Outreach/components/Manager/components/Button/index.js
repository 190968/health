import React from 'react';
import { Tooltip } from 'antd';
import { withToggleModal } from '../../../../../../../../../../../../components/Modal';
import { AddEditButton } from '../../../../../../../../../../../../components/UI/AddEditButton';
import { OutreachManager } from '../../../../containers/Manager';


const OutreachManagerButtonPure = props => {
    const { showModal, toggleModal, asMenuItem = false,  ...otherProps } = props;
    const {outreach} = props;

    const buttonOpts = {};
    if (outreach) {
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
            {showModal && <OutreachManager {...otherProps} onHide={toggleModal} />}
            <AddEditButton {...buttonOpts} onClick={toggleModal} />
            {/* <Tooltip title={reminderText}><span onClick={toggleModal} >{reminderText}</span></Tooltip> */}
		</React.Fragment>
	);

}

const OutreachManagerButton = withToggleModal(OutreachManagerButtonPure);

export default OutreachManagerButton;

