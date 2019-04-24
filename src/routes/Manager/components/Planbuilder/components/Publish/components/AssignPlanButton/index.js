import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { TaskManager } from '../../../../../Tasks/containers/Manager';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../../../components/Modal';
import TaskAssignButton from '../../../../../../../../components/Tasks/components/TaskAssignButton';

const AssignPlanButtonPure = props => {
    const { showModal, toggleModal, title, ...otherProps } = props;
    const titleButton = <FormattedMessage values={{ title }} {...DefaultI18nEn.assignSomething} />;
    return <React.Fragment>
        {showModal && <TaskManager attachments={[{type: 'ap', object:props.plan}]} mode={'simple'} onHide={toggleModal} />}

        <Tooltip title={titleButton} >
            <Button  onClick={toggleModal} >Click here to {titleButton}</Button>
        </Tooltip>
    </React.Fragment>
}
const AssignPlanButtonPure2 = props => {
    const {plan, label} = props;
    return <TaskAssignButton  size={'default'} mode={'simple'} buttonType={'green'} label={label} assignObject={{type: 'ap', object:plan}} />
}
export const AssignPlanButton = AssignPlanButtonPure2;//withToggleModal(AssignPlanButtonPure);
export default AssignPlanButton;