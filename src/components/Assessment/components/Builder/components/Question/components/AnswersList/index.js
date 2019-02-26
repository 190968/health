import React from 'react';
import {List, Button, Radio, Checkbox} from 'antd';
// import { AssessmentQuestionAnswerManager } from '../../containers/Answer';
import { ListWithMessage } from '../../../../../../../UI/List';
import { AssessmentQuestionAnswerManagerButton } from '../../../Buttons/Answer';

const AssessmentQuestionAnswersListManager = props => {
    
        const {answers=[], question } = props;
        // const {getAnswers=[]} = question || {};
        return <React.Fragment>
            <ListWithMessage
            emptyMessage={false}
            itemLayout="horizontal"
            // pagination={{
            //     pageSize: 5,
            //     hideOnSinglePage:true
            // }}
            size={'small'}
            dataSource={answers}
            renderItem={(answer, i) => {
                return <List.Item  key={i}
                actions={[<AssessmentQuestionAnswerManagerButton question={question} answer={answer} icon={'edit'} onChange={props.appendAnswer} />]}
                ><AssessmentQuestionAnswerManagerView answer={answer} question={question} /></List.Item>
            }} 
            />
            {/* <Button type={'dashed'} onClick={props.appendAnswer}>Append</Button> */}
            <AssessmentQuestionAnswerManagerButton question={question} onChange={props.updateAnswers}  />
        </React.Fragment>
}

export default AssessmentQuestionAnswersListManager;

const AssessmentQuestionAnswerManagerView = props => {
    const {answer, question} = props;
    const {label} = answer;
    return <div>{label} </div>

}