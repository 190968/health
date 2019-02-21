import React from 'react';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import { ProgramView } from '../../../../containers/View';

const ProgramsViewButtonPure = props => {
    const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
    const {program} = otherProps;
	return (
		<React.Fragment>
            {showModal && <ProgramView {...otherProps} onHide={toggleModal} />}
            <span onClick={toggleModal}>{program.name}</span>
		</React.Fragment>
	);
}

export const ProgramsViewButton = withToggleModal(ProgramsViewButtonPure);
export default ProgramsViewButton;