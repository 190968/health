import React from 'react';
import { Button, Tooltip } from 'antd';
import { RemindersManagerByTime } from '../../../../containers/RemindersManagerByTime';
import { withToggleModal } from '../../../../../Modal';
import { FormattedMessage } from 'react-intl';
import messages  from '../../../../i18n/en';
import messagesDefault from '../../../../../../i18n/en';
const ReminderManagerButton = (props) => {
    const { showModal, toggleModal, asMenuItem = false, asIcon = true, title=<FormattedMessage values={{ title: <FormattedMessage {...messages.reminders} />}} {...messagesDefault.newSomething}  />, ...otherProps } = props;
	return (
		<React.Fragment>
			{showModal && <RemindersManagerByTime {...otherProps} onHide={toggleModal} />}
            <Tooltip title={title}>
				{asIcon ? <Button icon={'plus'} size={'small'} onClick={toggleModal}  /> : <span className={'link'} onClick={toggleModal} >{title}</span>}
			</Tooltip>
		</React.Fragment>
	);
};

export default withToggleModal(ReminderManagerButton);
