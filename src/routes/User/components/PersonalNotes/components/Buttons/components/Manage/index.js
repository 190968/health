import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { PersonalNoteManager } from '../../../../containers/Manager';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, size='default', type='primary', button=true, title='PersonalNote', ...otherProps } = props;
    const { personalNote } = otherProps || {};
    const {id} = personalNote || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <PersonalNoteManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={type} label={label} button={button} icon={icon} size={size} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const PersonalNoteManagerButton = withToggleModal(ManagerButtonPure);
export default PersonalNoteManagerButton;