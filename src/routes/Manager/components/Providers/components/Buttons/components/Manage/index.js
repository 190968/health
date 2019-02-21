import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { ProviderManager } from '../../../../containers/Manager';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Provider', ...otherProps } = props;
    const { provider } = otherProps || {};
    const {id} = provider || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <ProviderManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const ProviderManagerButton = withToggleModal(ManagerButtonPure);
export default ProviderManagerButton;