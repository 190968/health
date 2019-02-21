import React from 'react';
import {Tooltip, Button} from 'antd';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { TaskForward } from '../../../Manager/containers/Forward';

const TaskForwardButtonPure = (props) => {
    const { showModal, toggleModal, asMenuItem=false, asIcon = true, ...otherProps } = props;
    const {task} = otherProps
    const title = <FormattedMessage  values={{title: task.title}} {...DefaultI18nEn.forwardSomething} />;
	return (
		<React.Fragment>
			{showModal && <TaskForward {...otherProps} modalTitle={title} onHide={toggleModal} />}
				<Tooltip title={<FormattedMessage  values={{title}} {...DefaultI18nEn.forwardSomething} />} >
					<Button size={'small'} onClick={toggleModal} ><FormattedMessage  values={{title}} {...DefaultI18nEn.forward} /></Button>
				</Tooltip>
		</React.Fragment>
	);
};
 
export const TaskForwardButton = withToggleModal(TaskForwardButtonPure);
