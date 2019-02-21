import React from 'react';
import { ProgramView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { program } = otherProps || {};
    const { title } = program || {};

    return <React.Fragment>
        {showModal && <ProgramView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const ProgramManagerButton = withToggleModal(ViewButton);
export default ProgramManagerButton;