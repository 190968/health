import React from 'react';
import {Table, Button, Icon} from 'antd';
import { AssessmentSectionManager } from '../../../containers/Section';
import { withToggleModal } from '../../../../../../Modal';

const AssessmentSectionManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        <Icon type={'delete'} onClick={toggleModal} />
    </React.Fragment>
}

export const AssessmentSectionDeleteButton = (AssessmentSectionManagerButtonPure);