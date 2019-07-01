import React from 'react';
import {List, Icon, Tooltip, Badge, Radio, Checkbox} from 'antd';
// import { AssessmentQuestionAnswerManager } from '../../containers/Answer';
import { ListWithMessage } from '../../../../../../../UI/List';
import { AssessmentQuestionAnswerManagerButton } from '../../../Buttons/Answer';
import { AssessmentQuestionAsnwerDeleteButton } from '../../../Buttons/Answer/delete';
import './index.less';
const AssessmentQuestionAnswersListManager = props => {
    
        const {answers=[], question, ...otherProps } = props;
        console.log(props, 'propsprops');
        // const {getAnswers=[]} = question || {};
        return <React.Fragment>
 

            <ListWithMessage
            emptyMessage={false}
            itemLayout="horizontal"
            size={'small'}
            bordered
            dataSource={answers}
            renderItem={(answer, i) => {
                const actions = [<AssessmentQuestionAnswerManagerButton {...otherProps} question={question} answerIndex={i} answer={answer} icon={'edit'} onChange={props.updateAnswer} />, <AssessmentQuestionAsnwerDeleteButton answerIndex={i} answer={answer} icon={'delete'} onDelete={props.deleteAnswer} />];
                return <List.Item key={i}
                actions={actions}
                ><AssessmentQuestionAnswerManagerView i={i} answer={answer} question={question} /></List.Item>
            }} 
            />
            {/* <Button type={'dashed'} onClick={props.appendAnswer}>Append</Button> */}
            <AssessmentQuestionAnswerManagerButton {...otherProps} question={question} onChange={props.updateAnswers}  />
        </React.Fragment>
}

export default AssessmentQuestionAnswersListManager;

const AssessmentQuestionAnswerManagerView = props => {
    const {answer, question} = props;
    const {label, isCritical, isValidAnswer, points} = answer;
    return <div style={{flex: '1 0'}}><span className={'assessment-answer-placeholder'}>{isValidAnswer && <Tooltip title={'Correct'} ><Icon type="check-circle" style={{color:'green', verticalAlign:'middle'}} /></Tooltip>}</span> {label} {<Tooltip title={'Points'} ><Badge count={points} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></Tooltip>} {isCritical && <Tooltip title={'Critical'} ><Icon type="warning" style={{color:'red', verticalAlign:'middle'}} /></Tooltip>}   </div>
}

 
