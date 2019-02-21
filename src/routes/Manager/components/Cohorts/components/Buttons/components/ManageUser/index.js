import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { Button } from 'antd';
import { CohortUserManager } from '../../../Patients/containers/UserManager';

const CohortUserManagerButtonPure = props => {
    const { showModal, toggleModal, label, size, icon, type='primary',  ...otherProps } = props;
    const {screening} = otherProps;
    const {title} = screening || {};
    // console.log(props, 'props');
    // const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <CohortUserManager {...otherProps} onHide={toggleModal} />}
        {/* <AddEditButton button label={title} /> */}
        <Button icon={icon} type={type} size={size} onClick={toggleModal}>{label}</Button>
    </React.Fragment>
}

export const CohortUserManagerButton = withToggleModal(CohortUserManagerButtonPure);
export default CohortUserManagerButton;