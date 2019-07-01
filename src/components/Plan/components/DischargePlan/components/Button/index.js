import React from 'react';
import {Button} from 'antd';
import { withToggleModal } from '../../../../../Modal';
import { DischargePlanManager } from '../../containers/Manager';
const DischargePlanButtonPure = props => {
    const {showModal, toggleModal, asText=false, button=false, label, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <DischargePlanManager {...otherProps} onHide={toggleModal} />}
       {button ? <Button onClick={toggleModal} >{label}</Button> : <a onClick={toggleModal} >{label}</a> }
    </React.Fragment>
}

export const DischargePlanButton = withToggleModal(DischargePlanButtonPure);