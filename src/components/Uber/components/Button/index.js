import React from 'react';
import {Button} from 'antd';
import { withToggleModal } from '../../../Modal';
import { UberRequest } from '../../containers/Request';
const UberRequestButtonPure = props => {
    const {showModal, toggleModal, asText=false, label, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <UberRequest {...otherProps} onHide={toggleModal} />}
       <Button onClick={toggleModal} >Ride with Uber</Button>
    </React.Fragment>
}

export const UberRequestButton = withToggleModal (UberRequestButtonPure);