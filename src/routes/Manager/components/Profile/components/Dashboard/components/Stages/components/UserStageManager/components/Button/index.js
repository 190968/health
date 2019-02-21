import React from 'react';
import { Icon, Tooltip, Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../../../../../i18n/en';
import { UserStageManager } from '../../../../containers/UserStageManager';
const ButtonStage = (props) => {
	const { showModal, toggleModal, asMenuItem=false, label, asIcon = true, ...otherProps } = props;
	return (
		<React.Fragment>
			{showModal && <UserStageManager {...otherProps} onHide={toggleModal} />}
			<Tooltip title={<FormattedMessage  values={{title: 'Stage'}} {...DefaultI18nEn.editSomething} />} >
				{label ? <Button type={'dashed'} onClick={toggleModal} >{label}</Button> : <Button icon={'edit'} size={'small'} onClick={toggleModal} />}
			</Tooltip>
		</React.Fragment>
	);
};
 
export const UserStageManagerButton = withToggleModal(ButtonStage);
