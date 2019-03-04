import React from 'react';
import {Table, Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../../Modal';
import { BrahmsRuleManager } from '../../../../containers/Rule';
import { compose, branch, withHandlers } from 'recompose';

const BrahmsRuleManagerButtonPure = props => {
    const {showModal, toggleModal, icon='edit', asButton=true, ...otherProps} = props;
    const {rule} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <BrahmsRuleManager {...otherProps} onHide={toggleModal} />}
        {rule ? <Icon type={icon} onClick={toggleModal} /> : <Button type={'dashed'} block onClick={toggleModal}>Add Rule</Button>}
    
    </React.Fragment>
}


const enhance = compose(
    branch(props => {
        const {rule} = props;
        const {id} = rule || {};
        return !id || id !== '';
    }, withHandlers({
        onChange: props => (value) => {
            const {rule, onChange, ruleIndex} = props;
            // console.log(props);
            // console.log(value, 'rule');
            if (onChange) {
                onChange({...rule, ...value}, ruleIndex);
            }
        }
    })),
    withToggleModal
);

export const BrahmsRuleManagerButton = enhance(BrahmsRuleManagerButtonPure);