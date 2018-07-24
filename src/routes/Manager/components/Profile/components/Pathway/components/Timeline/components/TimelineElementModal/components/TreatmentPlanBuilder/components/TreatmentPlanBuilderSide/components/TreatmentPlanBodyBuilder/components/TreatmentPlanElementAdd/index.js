import React from 'react';
import {Icon} from 'antd';
import  TreatmentPlanElementManager  from '../../containers/TreatmentPlanElementManager';

const TreatmentPlanElementAdd = props => {
    const {openModal=false, toggleModalAdd, ...otherProps} = props;
    return <React.Fragment>
        <Icon type="edit" onClick={toggleModalAdd} />
        {openModal && <TreatmentPlanElementManager {...otherProps} type={'instruction'} onHide={toggleModalAdd} />}
    </React.Fragment>;
}

export default TreatmentPlanElementAdd;