import React from 'react';
import {Tabs} from 'antd';
import AssessmentBody from '../AssessmentView/containers/AssessmentBody';
import {AssessmentsManagerSettings} from './containers/Settings';
import { AssessmentsManagerPublish } from './containers/Publish';
 
const TabPane = Tabs.TabPane;

export const AssessmentManagerSteps = [
    {key: 'settings'},
    {key: 'body'},
    {key: 'score'},
    {key: 'preview'},
    {key: 'publish'},
];
const AssessmentsManager = props => {
    const {assessment, activeStep, setActiveStep, onHide, refetch} = props;
    const disabled = !assessment;
    console.log(props,'TABS');
    return <React.Fragment>

            <Tabs activeKey={activeStep || '1'} onChange={setActiveStep} >
                <TabPane tab="Settings" key="settings"><AssessmentsManagerSettings {...props} /></TabPane>
                <TabPane tab="Assessment Body" disabled={disabled} key="body"><AssessmentBody assessment={assessment} isBuilderMode /></TabPane>
                {/* <TabPane tab="Score" disabled={disabled} key="score">Sccore</TabPane> */}
                <TabPane tab="Review" disabled={disabled} key="preview"><AssessmentBody assessment={assessment} isPreviewMode /></TabPane>
                <TabPane tab="Publish" disabled={disabled} key="publish"><AssessmentsManagerPublish assessment={assessment} onHide={onHide} refetch={refetch} /> </TabPane>
            </Tabs>
            
        </React.Fragment>
}
 
export default AssessmentsManager;