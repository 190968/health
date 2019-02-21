import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ActionplansView } from '../../../../containers/View';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { actionplans } = otherProps || {};
    const { title } = actionplans || {};

    return <React.Fragment>
        {showModal && <ActionplansView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const ActionplansManagerButton = withToggleModal(ViewButton);
export default ActionplansManagerButton;