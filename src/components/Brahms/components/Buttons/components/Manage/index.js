import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { BrahmManager } from '../../../../containers/Manager';
import DefaultI18nEn from '../../../../../../i18n/ru';
import { AddEditButton } from '../../../../../UI/AddEditButton';
import { withToggleModal } from '../../../../../Modal';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Brahm', ...otherProps } = props;
    const { brahm } = otherProps || {};
    const {id} = brahm || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <BrahmManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const BrahmManagerButton = withToggleModal(ManagerButtonPure);
export default BrahmManagerButton;