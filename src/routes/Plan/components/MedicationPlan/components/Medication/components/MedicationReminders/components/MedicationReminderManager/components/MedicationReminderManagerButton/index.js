import React from 'react';
import { MedicationReminderManager } from '../../../../containers/MedicationReminderManager';
import { withToggleModal } from '../../../../../../../../../../../../components/Modal';
import { Button, Tooltip } from 'antd';

const MedicationReminderManagerButton = (props) => {
    const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
    console.log(props);
	return (
		<React.Fragment>
			{showModal && <MedicationReminderManager {...otherProps} onHide={toggleModal} />}
            <Tooltip title={'Add Medication Reminder'}><Button icon={'plus'} onClick={toggleModal} /></Tooltip>
		</React.Fragment>
	);
};

export default withToggleModal(MedicationReminderManagerButton);
