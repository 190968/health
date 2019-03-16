import React from 'react'
import {List, message, Modal, Divider, Tooltip, Icon} from 'antd';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { DragHandle } from '../../../../../FormCustomFields/components/Options';
import { PlanElementDeleteButton } from '../../../Builder/components/Buttons/containers/DeleteElement';
import { PlanElement } from '../../../../../../routes/Plan/components/PlanLayout/components/PlanElement';

const PlanElementItem = (props) => {
    const {element, isBuilderMode, ...otherProps} = props;
    
    let questionCardExtra = [];
    if (isBuilderMode) {
        const {plan} = props;
        // questionCardExtra.push(<AssessmentQuestionManagerButton key={'manager'} assessment={assessment} section={section} question={question} />);
        questionCardExtra.push(<DragHandle key="drag" style={{marginLeft:5}} />);
        questionCardExtra.push(<PlanElementDeleteButton  key={'delete'}  plan={plan} element={element} />);
    }

    return <List.Item key={element.id}>
    <PlanElement {...props} />
</List.Item>;
}


export default PlanElementItem;
