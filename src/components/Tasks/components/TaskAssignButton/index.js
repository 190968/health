import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../Modal';
import DefaultI18nEn from '../../../../i18n/en';
import { TaskAssignWizzard } from '../../containers/TaskAssignWizzard';

const TaskAssignButtonPure = props => {
    const { showModal, toggleModal, label, asMenuItem, asPlusIcon, icon, asIcon, title='', asText=false, ...otherProps } = props;
    const titleButton = <FormattedMessage values={{ title }} {...DefaultI18nEn.assignSomething} />;
    return <React.Fragment>
        {showModal && <TaskAssignWizzard {...otherProps} onHide={toggleModal} />}

        <Tooltip title={titleButton} >
        {asMenuItem ? <span onClick={toggleModal}>{label}</span> : icon ? <Button icon={icon} size={'small'} onClick={toggleModal} /> : asText ? <span onClick={toggleModal} >{titleButton}</span> : asPlusIcon ? <Button icon={'plus'} onClick={toggleModal}  size={'small'} /> : <Button onClick={toggleModal} >{titleButton}</Button>}
        </Tooltip>
    </React.Fragment>
}

export const TaskAssignButton = withToggleModal(TaskAssignButtonPure);
export default TaskAssignButton;