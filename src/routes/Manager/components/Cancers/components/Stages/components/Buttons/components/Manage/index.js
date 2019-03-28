import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { CancerStageManager } from '../../../../containers/Manager';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../../../i18n/en';
import { AddEditButton } from '../../../../../../../../../../components/UI/AddEditButton';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='CancerStage', ...otherProps } = props;
    const { cancerStage } = otherProps || {};
    const {id} = cancerStage || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <CancerStageManager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const CancerStageManagerButton = withToggleModal(ManagerButtonPure);
export default CancerStageManagerButton;