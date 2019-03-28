import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ChemotherapyView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { chemotherapy } = otherProps || {};
    const { title } = chemotherapy || {};

    return <React.Fragment>
        {showModal && <ChemotherapyView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const ChemotherapyManagerButton = withToggleModal(ViewButton);
export default ChemotherapyManagerButton;