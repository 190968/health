import React from 'react';
import { Button, Tooltip, Icon } from 'antd';
import { AttachmentModuleTypeSelect } from '../../containers/SelectType';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../Modal';
import DefaultI18nEn from '../../../../../../i18n/en';

const AttachmentModuleButtonPure = props => {
    const { showModal, toggleModal, icon='plus', button=true, buttonLabel, showSelectIfEmpty=false, ...otherProps } = props;
    const title = buttonLabel;//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    const {attachments=[]} = props;
    // if (showSelectIfEmpty && attachments && attachments.length === 0) {
    //     return <AttachmentModuleTypeSelect {...otherProps} asModal={false} onHide={toggleModal} />;
    // }
    return <React.Fragment>
        {showModal && <AttachmentModuleTypeSelect {...otherProps} onHide={toggleModal} />}

        <Tooltip title={title} >
            {button ? <Button icon={icon} size={'small'} onClick={toggleModal} >{title}</Button> : <Icon type={icon} onClick={toggleModal} />}
        </Tooltip>
    </React.Fragment>
}

export const AttachmentModuleButton = withToggleModal(AttachmentModuleButtonPure);
export default AttachmentModuleButton;