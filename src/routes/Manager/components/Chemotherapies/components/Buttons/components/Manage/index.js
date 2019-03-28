import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { ChemotherapyManager } from '../../../../containers/Manager';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Chemotherapy', ...otherProps } = props;
    const { chemotherapy } = otherProps || {};
    const {id} = chemotherapy || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <ChemotherapyManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const ChemotherapyManagerButton = withToggleModal(ManagerButtonPure);
export default ChemotherapyManagerButton;