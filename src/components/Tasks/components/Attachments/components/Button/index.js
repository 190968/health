import React from 'react';
import { Button, Tooltip } from 'antd';
import { TaskManagerAttachmentTypeSelect } from '../../containers/SelectType';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../Modal';
import DefaultI18nEn from '../../../../../../i18n/en';

const TaskManagerAttachmentButtonPure = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    const title = <FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <TaskManagerAttachmentTypeSelect {...otherProps} onHide={toggleModal} />}

        <Tooltip title={title} >
            <Button icon={'plus'} size={'small'} onClick={toggleModal} >{title}</Button>
        </Tooltip>
    </React.Fragment>
}

export const TaskManagerAttachmentButton = withToggleModal(TaskManagerAttachmentButtonPure);
export default TaskManagerAttachmentButton;