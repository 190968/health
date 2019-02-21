import React from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';

const MedicationDeleteButton = (props) => {
	const { medicationDeleteConfirm } = props;
	return (
		<Tooltip title={'Archive Medication'}>
			{/* <Popconfirm title="Are you sure you want to Arhive this Medication?" onConfirm={deleteMedication}> */}
				<span className={'pointer'} onClick={medicationDeleteConfirm}><FormattedMessage id={'archive'} defaultMessage={'Archive'} /></span>
			{/* </Popconfirm> */}
		</Tooltip>
	);
};

export default MedicationDeleteButton;
