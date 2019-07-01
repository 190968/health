import React from 'react';
import { Button, Tooltip, Icon } from 'antd';
import { withToggleModal } from '../../../../../../../Modal';
import { DmeReferralManager } from '../../../../containers/Manager';

const DmeReferralManagerButtonPure = props => {
    const { showModal, toggleModal, icon='plus', button=true, label, buttonLabel, ...otherProps } = props;
    const {equipment} = props;
    const tooltip = equipment ? 'Edit': 'Add';//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    const title = buttonLabel;//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <DmeReferralManager {...otherProps} onHide={toggleModal} />}

        <Tooltip title={tooltip} >
            {button ? <Button icon={icon} size={'small'} onClick={toggleModal} >{title}</Button> : (label ? <a onClick={toggleModal} >{label}</a> : <Icon type={icon} onClick={toggleModal} />)}
        </Tooltip>
    </React.Fragment>
}

export const DmeReferralManagerButton = withToggleModal(DmeReferralManagerButtonPure);