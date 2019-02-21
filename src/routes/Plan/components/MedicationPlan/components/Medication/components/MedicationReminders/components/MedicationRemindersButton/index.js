import React from 'react';
import { MedicationRemindersModal } from '../../../../containers/MedicationReminders';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import { FormattedMessage } from 'react-intl';

const MedicationRemindersButton = (props) => {
	const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
	return (
		<React.Fragment>
			{showModal && <MedicationRemindersModal {...otherProps} onHide={toggleModal} />}
            <span className={'pointer'} onClick={toggleModal}><FormattedMessage id={'reminders'} defaultMessage={'Reminders'} /></span>
		</React.Fragment>
	);
};

export default withToggleModal(MedicationRemindersButton);
