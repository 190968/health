import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { CancerManager } from '../../../../containers/Manager';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import DefaultI18nEn from '../../../../../../../../i18n/en';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Cancer', ...otherProps } = props;
    const { cancer } = otherProps || {};
    const {id} = cancer || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <CancerManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const CancerManagerButton = withToggleModal(ManagerButtonPure);
export default CancerManagerButton;