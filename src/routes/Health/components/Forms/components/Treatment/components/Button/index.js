import React from 'react';
import {Button} from 'antd';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { TreatmentFormElementManager } from '../../containers/ElementManager';
import { AddEditButton } from '../../../../../../../../components/UI/AddEditButton';




const TreatmentElementAddButtonPure = props => {
    const { showModal, toggleModal, edit, ...otherProps } = props;
    return <React.Fragment>
        {showModal && <TreatmentFormElementManager {...otherProps} onHide={toggleModal} />}


        {edit ? <AddEditButton icon={'edit'} onClick={props.toggleModal} />:  <Button icon={'plus'} type="dashed" onClick={props.toggleModal} style={{ width: '60%' }}>
            Add Treatment
        </Button>}
       
    </React.Fragment>
}
const TreatmentElementAddButton = withToggleModal(TreatmentElementAddButtonPure);
export default TreatmentElementAddButton;