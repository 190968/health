import React from 'react';
import { TrackerInputModal } from '../../../../../../containers/Tracker';
import { withToggleModal } from '../../../../../../../../components/Modal';

const TrackerReportModalButtonPure = props => {
    const { showModal, toggleModal, label,  ...otherProps } = props;
    const {screening} = otherProps;
    const {title} = screening || {};
    // console.log(props, 'props');
    // const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <TrackerInputModal {...otherProps} onHide={toggleModal} />}
        <span onClick={toggleModal}>{label}</span>
    </React.Fragment>
}

export const TrackerReportModalButton = withToggleModal(TrackerReportModalButtonPure);