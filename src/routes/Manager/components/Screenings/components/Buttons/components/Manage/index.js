import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { ScreeningManager } from '../../../../containers/Manager';

const ScreeningsManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Screening', ...otherProps } = props;
    const {screening} = otherProps;
    //  console.log(props);
    const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <ScreeningManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const ScreeningsManagerButton = withToggleModal(ScreeningsManagerButtonPure);
export default ScreeningsManagerButton;