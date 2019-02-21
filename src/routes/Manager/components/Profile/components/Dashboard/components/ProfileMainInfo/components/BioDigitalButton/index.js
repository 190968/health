import React from 'react';
import {Icon} from 'antd';
import { BioDigital } from '../../containers/BioDigital';
import { withToggleModal } from '../../../../../../../../../../components/Modal';

const BioDigitalButtonPure = props => {
    const { showModal, toggleModal, icon, label, ...otherProps } = props;
    return <React.Fragment>
        {showModal && <BioDigital {...otherProps} onHide={toggleModal} />}
        <Icon type="picture" onClick={props.toggleModal} />
    </React.Fragment>
}


const BioDigitalButton = withToggleModal(BioDigitalButtonPure);
export default BioDigitalButton;