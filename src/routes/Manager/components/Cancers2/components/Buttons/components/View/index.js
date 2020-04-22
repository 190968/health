import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { CancerView } from '../../../../containers/View';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { cancer } = otherProps || {};
    const { title } = cancer || {};

    return <React.Fragment>
        {showModal && <CancerView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const CancerViewButton = withToggleModal(ViewButton);
export default CancerViewButton;