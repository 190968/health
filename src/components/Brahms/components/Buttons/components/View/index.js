import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BrahmView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { brahm } = otherProps || {};
    const { title } = brahm || {};

    return <React.Fragment>
        {showModal && <BrahmView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const BrahmManagerButton = withToggleModal(ViewButton);
export default BrahmManagerButton;