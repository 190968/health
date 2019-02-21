import React from 'react';
import { Icon, Tooltip, Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import {TaskManageri18n} from '../../../../i18n/en';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { TaskManager } from '../../../../containers/Manager';

const ManagerButton = (props) => {
	const { showModal, toggleModal, asMenuItem=false, label, asIcon = true, ...otherProps } = props;
	const {task} = otherProps;
	return (
		<React.Fragment>
			{showModal && <TaskManager {...otherProps} onHide={toggleModal} />}


			{task ? <Tooltip title={<FormattedMessage  values={{title: <FormattedMessage {...TaskManageri18n.task}  />}} {...DefaultI18nEn.editSomething} />} >
				<Button icon={'edit'} size={'small'} onClick={toggleModal} >{label}</Button>
			</Tooltip> : (
				<Tooltip title={<FormattedMessage  values={{title: <FormattedMessage {...TaskManageri18n.task}  />}} {...DefaultI18nEn.addSomething} />} >
					<Button icon={'plus'} size={'small'} onClick={toggleModal} />
			</Tooltip>)}
		</React.Fragment>
	);
};
 
export const TaskManagerButton = withToggleModal(ManagerButton);
