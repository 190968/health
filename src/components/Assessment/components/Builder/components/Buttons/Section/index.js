import React from 'react';
import {Table, Button, Icon} from 'antd';
import { AssessmentSectionManager } from '../../../containers/Section';
import { withToggleModal } from '../../../../../../Modal';

const AssessmentSectionManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    const {section} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentSectionManager  {...otherProps}  onHide={toggleModal} />}
        {section ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={'primary'} onClick={toggleModal}>Add Section</Button>}
    </React.Fragment>
}

export const AssessmentSectionManagerButton = withToggleModal(AssessmentSectionManagerButtonPure);