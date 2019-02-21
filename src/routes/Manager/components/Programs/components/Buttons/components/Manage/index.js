import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProgramManager } from '../../../../containers/Manager';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Program', ...otherProps } = props;
    const { program } = otherProps || {};
    const {id} = program || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn .addEditSomething} />;
    return <React.Fragment>
        {showModal && <ProgramManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const ProgramManagerButton = withToggleModal(ManagerButtonPure);
export default ProgramManagerButton;