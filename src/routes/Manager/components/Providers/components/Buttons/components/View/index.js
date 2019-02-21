import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProviderView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { provider } = otherProps || {};
    const { title } = provider || {};

    return <React.Fragment>
        {showModal && <ProviderView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const ProviderManagerButton = withToggleModal (ViewButton);
export default ProviderManagerButton;