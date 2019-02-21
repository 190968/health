import React from 'react';
import {Icon, Tooltip} from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import MedicationVideo from '../../../../containers/MedicationVideo';


const MedicationVideoButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <MedicationVideo {...otherProps} onHide={toggleModal} />}
        <Tooltip title={'Show Medication Video'}><Icon type="video-camera" theme="outlined" className={'pointer'} onClick={toggleModal} /></Tooltip>
    </React.Fragment>
}

export default withToggleModal(MedicationVideoButton);