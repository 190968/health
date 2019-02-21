import React from 'react';
import { Tooltip } from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import MedicationFullDetails from '../../../../containers/MedicationFullDetails';
import { FormattedMessage } from 'react-intl';

const MedicationInfoButton = (props) => {
	const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
	const viewInfoText = <FormattedMessage id={'view.info'} defaultMessage={'View Info'} />;
	return (
		<React.Fragment>
			{showModal && <MedicationFullDetails {...otherProps} onHide={toggleModal} />}

			<Tooltip title={viewInfoText}>
				<span className={'pointer'} onClick={toggleModal}>
				{viewInfoText}
				</span>
			</Tooltip>
		</React.Fragment>
	);
};

export default withToggleModal(MedicationInfoButton);
