import React from 'react';
import {Table, Button, Icon} from 'antd';
import { compose, branch, withHandlers } from 'recompose';
import { withToggleModal } from '../../../../../../../Modal';
import { PlanElementBuilder } from '../../../../containers/ElementManager';

const PlanElementManagerButtonPure = props => {
    const {showModal, toggleModal, label, shape, buttonType='dashed', icon, asButton=true, ...otherProps} = props;
    const {element} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <PlanElementBuilder {...otherProps} asModal onHide={toggleModal} />}
        {element ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={buttonType} shape={shape} icon={'plus'}  onClick={toggleModal}>{label || 'Add Element'}</Button>}
    
    </React.Fragment>
}

const enhance = compose(
    branch(props => {
        const {answer} = props;
        const {id} = answer || {};
        return !id || id !== '';
    }, withHandlers({
        onChange: props => (value) => {
            const {onChange, answerIndex} = props;
            if (onChange) {
                onChange(value, answerIndex);
            }
        }
    })),
    withToggleModal
);
export const PlanElementManagerButton = enhance(PlanElementManagerButtonPure);