import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';
import { CohortManager } from '../../../../containers/Manager';

const CohortManagerButtonPure = props => {
    const { showModal, toggleModal, label, button=false, type, icon, title='Cohort', ...otherProps } = props;
    const {cohort} = otherProps;
    const {id} = cohort || {};

    const titleButton = <FormattedMessage values={{ title, isUpdate:(id && id !== '') }} {...DefaultI18nEn.createUpdateSomething} />;
    return <React.Fragment>
        {showModal && <CohortManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} button={button} type={type} icon={icon} size={'default'} label={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const CohortManagerButton = withToggleModal(CohortManagerButtonPure);
export default CohortManagerButton;