import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PersonalNoteView } from '../../../../containers/View';
import { withToggleModal } from '../../../../../../../../components/Modal';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { personalNote } = otherProps || {};
    const { title } = personalNote || {};

    return <React.Fragment>
        {showModal && <PersonalNoteView {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const PersonalNoteManagerButton = withToggleModal(ViewButton);
export default PersonalNoteManagerButton;