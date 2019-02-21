import React from 'react';
import { Icon, Tooltip, Button } from 'antd';
import { TrackerManager } from '../../../../containers/TrackerManager';
import { withToggleModal } from '../../../../../../../../components/Modal';

const TrackerManagerButton = (props) => {
	const { showModal, toggleModal, asMenuItem=false, asIcon = true, ...otherProps } = props;
	const { tracker, user } = otherProps;
	return (
		<React.Fragment>
			{showModal && <TrackerManager {...otherProps} onHide={toggleModal} />}

			{tracker ? (
				<Tooltip title={'Edit Tracker'}>
                {asIcon ? <Icon type="edit" theme="outlined" className={'pointer'} onClick={toggleModal} /> : <span className={'pointer'} onClick={toggleModal} >Edit</span>}
					
				</Tooltip>
			) : (
				asMenuItem ? <span onClick={toggleModal} >Add Tracker</span> : (
				<Tooltip title={'Add Tracker'}>
					<Button icon={'plus'} size={'small'} onClick={toggleModal} />
				</Tooltip>)
			)}
		</React.Fragment>
	);
};
 
export default withToggleModal(TrackerManagerButton);
