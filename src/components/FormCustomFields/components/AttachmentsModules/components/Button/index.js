import React from 'react';
import { Button, Tooltip } from 'antd';
import { AttachmentModuleTypeSelect } from '../../containers/SelectType';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../Modal';
import DefaultI18nEn from '../../../../../../i18n/en';

const AttachmentModuleButtonPure = props => {
    const { showModal, toggleModal, icon='plus', buttonLabel, ...otherProps } = props;
    const title = buttonLabel;//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <AttachmentModuleTypeSelect {...otherProps} onHide={toggleModal} />}

        <Tooltip title={title} >
            <Button icon={icon} size={'small'} onClick={toggleModal} >{title}</Button>
        </Tooltip>
    </React.Fragment>
}

export const AttachmentModuleButton = withToggleModal(AttachmentModuleButtonPure);
export default AttachmentModuleButton;