import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { CampaignView } from '../../../../containers/View';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;
    const { campaign } = otherProps || {};
    const { title } = campaign || {};
    return <React.Fragment>
        {showModal && <CampaignView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a>
    </React.Fragment>
}

export const CampaignViewButton = withToggleModal(ViewButton);
export default CampaignViewButton;