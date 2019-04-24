import React from 'react';
import {Table, Button, Icon} from 'antd';
import { compose, branch, withHandlers } from 'recompose';
import { withToggleModal } from '../../../../../../../Modal';
import { PlanElementBuilder } from '../../../../containers/ElementManager';
import { IconCustom } from '../../../../../../../FitIcon';

const PlanElementManagerButtonPure = props => {
    const {showModal, toggleModal, label, asButton=true, shape, buttonType='dashed', icon,  ...otherProps} = props;
    const {element, mode} = props;
    // console.log(props, 'props111');
    const isLesson = mode === 'lesson';
    let buttonColor = buttonType;
    if (isLesson) {
        // buttonColor = 'green';
    }
    return <React.Fragment>
        {showModal && <PlanElementBuilder {...otherProps} asModal onHide={toggleModal} />}
        {element ? (icon === 'brahms' ? <IconCustom type={'brahms'} onClick={toggleModal} style={{marginRight:5}} /> : <Icon type={'edit'} onClick={toggleModal} />) : (asButton ? <Button type={buttonColor} shape={shape} icon={'plus'}  onClick={toggleModal}>{label || 'Add Element'}</Button> : <span onClick={toggleModal}>{label}</span>)}
    
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