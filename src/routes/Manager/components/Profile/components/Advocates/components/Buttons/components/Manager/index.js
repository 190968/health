
import React from 'react';
import { Tooltip } from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import { PatientAdvocateManager } from '../../../../containers/Manager';
import { AddEditButton } from '../../../../../../../../../../components/UI/AddEditButton';

const PatientAdvocateManagerButtonPure = (props) => {
	const { showModal, toggleModal, icon, button=true, asMenuItem = false, asIcon = true, ...otherProps } = props;
	// const reminderText = 'Edit';
	return (
		<React.Fragment>
			{showModal && <PatientAdvocateManager {...otherProps} onHide={toggleModal} />}
			<AddEditButton button={button} onClick={toggleModal} icon={icon} />
		</React.Fragment>
	);
};

export const PatientAdvocateManagerButton = withToggleModal(PatientAdvocateManagerButtonPure);
export default PatientAdvocateManagerButton;