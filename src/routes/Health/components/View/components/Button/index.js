import React from 'react';
import {Button} from 'antd';
import { withToggleModal } from '../../../../../../components/Modal';
import { HealthView } from '../../../../containers/View';
const HealthViewButtonPure = props => {
    const {showModal, toggleModal, asText=false, label, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <HealthView {...otherProps} asModal onHide={toggleModal} />}
        {asText ? <div onClick={toggleModal} >{label}</div> :  <Button size={'small'} icon={'plus'} onClick={toggleModal} />}
    </React.Fragment>
}

export const HealthViewButton = withToggleModal(HealthViewButtonPure);