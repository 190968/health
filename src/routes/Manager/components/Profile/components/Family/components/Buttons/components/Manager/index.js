
import React from 'react';
import { Tooltip } from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import FamilyManager from '../../../../containers/FamilyManager';

const FamilyManagerButtonPure = (props) => {
	const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
	const reminderText = 'Edit';
	return (
		<React.Fragment>
			{showModal && <FamilyManager {...otherProps} onHide={toggleModal} />}
            <Tooltip title={reminderText}><span onClick={toggleModal} >{reminderText}</span></Tooltip>
		</React.Fragment>
	);
};

export const FamilyManagerButton = withToggleModal(FamilyManagerButtonPure);
export default FamilyManagerButton;