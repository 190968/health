import React from 'react';
import { Button, Tooltip } from 'antd';
import { withToggleModal } from '../../../Modal';
import { RemindersList } from '../../containers/RemindersList';
import { FormattedMessage } from 'react-intl';
import messages from '../../i18n/en';

const ReminderManagerButton = (props) => {
	const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
	const reminderText = <FormattedMessage {...messages.reminders} />
	return (
		<React.Fragment>
			{showModal && <RemindersList {...otherProps} onHide={toggleModal} />}
            <Tooltip title={reminderText}><span onClick={toggleModal} >{reminderText}</span></Tooltip>
		</React.Fragment>
	);
};

export default withToggleModal(ReminderManagerButton);
