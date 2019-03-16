import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Button} from 'antd';
// import { withToggleModal } from '../../../../../../../../components/Modal';
// import { AssessementManager } from '../../../../containers/AssessmentManager';

export const PathwayManagerButton = props => {
    const {showModal, toggleModal, label, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    const {pathway} = props;
    return <React.Fragment>
        {/* {showModal && <AssessementManager  {...otherProps}  onHide={toggleModal} />} */}
        {pathway ? <Link to={'/builder/pathway/'+pathway.id} >{label ? label : 'Edit'}</Link> : <Link to={'/builder/pathway'} ><Button type={'primary'} icon={'plus'} /></Link>}
        {/* {assessment ? <span   onClick={toggleModal}>{label ? label : 'Edit'}</span> : <Button onClick={toggleModal} type={'primary'} icon={'plus'} />} */}
    </React.Fragment>
}

// export const AssessmentManagerButton = withToggleModal(AssessmentManagerButtonPure);