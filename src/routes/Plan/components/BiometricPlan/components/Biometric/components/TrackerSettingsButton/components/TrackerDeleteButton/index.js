import React from 'react';
import { Popconfirm, Tooltip } from 'antd';

const TrackerDeleteButton = (props) => {
	const { trackerDeleteConfirm } = props;
	return (
		<Tooltip title={'Archive Tracker'}>
			{/* <Popconfirm title="Are you sure you want to Arhive this Medication?" onConfirm={deleteMedication}> */}
				<span className={'pointer'} onClick={trackerDeleteConfirm}>Archive</span>
			{/* </Popconfirm> */}
		</Tooltip>
	);
};

export default TrackerDeleteButton;
