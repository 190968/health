import React from 'react';
import {Table, Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../../Modal';
import { BrahmsRuleManager } from '../../../../containers/Rule';

const BrahmsRuleManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    const {answer} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <BrahmsRuleManager {...otherProps} onHide={toggleModal} />}
        {answer ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={'dashed'} onClick={toggleModal}>Add Rule</Button>}
    
    </React.Fragment>
}

export const BrahmsRuleManagerButton = withToggleModal(BrahmsRuleManagerButtonPure);