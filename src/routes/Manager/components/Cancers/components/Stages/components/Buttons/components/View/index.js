import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CancerStageView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { cancerStage } = otherProps || {};
    const { title } = cancerStage || {};

    return <React.Fragment>
        {showModal && <CancerStageView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const CancerStageManagerButton = withToggleModal(ViewButton);
export default CancerStageManagerButton;