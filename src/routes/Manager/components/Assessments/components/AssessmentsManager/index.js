import React from 'react';
import {Tabs, Card} from 'antd';
import {Switch, Route} from 'react-router-dom';
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
    const {match, assessment, history, activeStep, setActiveStep, onHide, refetch} = props;
    const disabled = !assessment;
    const {params} = match || {};
    const {action} = params || {};
    console.log(match,'match');
    console.log(props,'TABS');
    console.log(`${match.url}/:id?/preview`,'TABS');

    switch(action) {
        case 'preview':
            return <AssessmentBody assessment={assessment} isPreviewMode />;
        case 'body':
            return <AssessmentBody assessment={assessment} isBuilderMode />;
        case 'publish':
            return <Card title={'Publish'}><AssessmentsManagerPublish assessment={assessment} history={history} /></Card>;
        default:
            return <Card title="Settings"><AssessmentsManagerSettings  {...props} /></Card>;
    }
    // let body = 
    // return <Switch>
    //             <Route path={`${match.url}/:id?/settings`}  render={(ownProps) => <AssessmentsManagerSettings {...props}/>} />
    //             <Route path={`${match.url}/:id?/body`}  render={(ownProps) => <AssessmentBody assessment={assessment} isBuilderMode />} />
    //             <Route path={`preview`}  render={() => <AssessmentBody assessment={assessment} isPreviewMode />} />
    //             <Route path={`${match.url}/:id?/publish`}  render={() => <AssessmentsManagerPublish assessment={assessment} />} />
    //             <Route  render={(ownProps) => <AssessmentsManagerSettings  {...props}/>} />
    //         </Switch>
    //         // <Tabs activeKey={activeStep || '1'} onChange={setActiveStep} >
    //         //     <TabPane tab="Settings" key="settings"><AssessmentsManagerSettings {...props} /></TabPane>
    //         //     <TabPane tab="Assessment Body" disabled={disabled} key="body"><AssessmentBody assessment={assessment} isBuilderMode /></TabPane>
    //         //     {/* <TabPane tab="Score" disabled={disabled} key="score">Sccore</TabPane> */}
    //         //     <TabPane tab="Review" disabled={disabled} key="preview"><AssessmentBody assessment={assessment} isPreviewMode /></TabPane>
    //         //     <TabPane tab="Publish" disabled={disabled} key="publish"><AssessmentsManagerPublish assessment={assessment} onHide={onHide} refetch={refetch} /> </TabPane>
    //         // </Tabs>
            
}
 
export default AssessmentsManager;