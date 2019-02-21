import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
// import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { ScreeningPopulationUserManager } from '../../../Population/containers/UserManager';
import { Button } from 'antd';

const ScreeningPopulationUserManagerButtonPure = props => {
    const { showModal, toggleModal, label, size, icon,  ...otherProps } = props;
    const {screening} = otherProps;
    const {title} = screening || {};
    // console.log(props, 'props');
    // const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <ScreeningPopulationUserManager {...otherProps} onHide={toggleModal} />}
        {/* <AddEditButton button label={title} /> */}
        <Button icon={icon} type={"primary"} size={size} onClick={toggleModal}></Button>
    </React.Fragment>
}

export const ScreeningPopulationUserManagerButton = withToggleModal(ScreeningPopulationUserManagerButtonPure);
export default ScreeningPopulationUserManagerButton;