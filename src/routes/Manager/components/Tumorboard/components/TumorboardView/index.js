import React from 'react';
import {Row, Col, Tabs} from 'antd';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {Comments} from "../../../../../../components/Comments/index";
import {withStateHandlers} from 'recompose';
import {TumorboardElements} from "./components/TumorboardElements/index";
import TumorboardNextSteps from "./components/TumorboardNextSteps/index";
import {Options} from "../../../../../../components/FormCustomFields/components/Options/index";

const TabPane = Tabs.TabPane;

export const TumorboardView = props => {
    const {tumorboard={}, onTabChange, currentTab='main', loading=false} = props;
    const {id, title='', startTime, endTime, notes='', location='', video='', patient={}, lead=null, admin=null, elements=[], getNewCommentsNumber=0} = tumorboard;
    //const {id:leadUid=''} = lead;
    //const {id:adminUid=''} = admin;
    let userId = '';
    let items = [
        ['Patient', [<AvatarWithName info={patient} key={1} />, <span style={{verticalAlign:'middle'}} key={2}>, {patient.age+', '+patient.genderText}</span>]],
        ['Title', title],
        ['Start Time', moment(startTime).format('LLL')],
    ];
    if (endTime) {
        items.push(['End Time', moment(endTime).format('LLL')]);
    }
    if (lead) {
        items.push(['Lead', <AvatarWithName info={lead} />]);
    }
    if (admin) {
        items.push(['Admin', <AvatarWithName info={admin} />]);
    }

    if (location !== '') {
        items.push(['Location', location]);
    }
    if (video !== '') {
        items.push(['Video', video]);
    }
    if (notes !== '') {
        items.push(['Notes', notes]);
    }

    const mainInfo = items.map((item, i) => {
        return <Row style={{marginBottom:5}} key={i}>
            <Col span={6}>{item[0]}</Col>
            <Col span={18}>{item[1]}</Col>
        </Row>
    });
    const elementsInfo = <TumorboardElements tumorboard={tumorboard} elements={elements} editable={false} userId={userId} loading={loading} />;
    const commentsInfo = <Comments id={id} type="tumorboard" title="Comments" userId={userId} />;

    const nextInfo = <TumorboardNextSteps tumorboard={tumorboard} userId={userId} />;

    return <React.Fragment>
        {mainInfo}
        <Tabs defaultActiveKey="elementsInfo" size="small">
            <TabPane tab="Details" key="elementsInfo">{elementsInfo}</TabPane>
            <TabPane tab={"Comments "+ (getNewCommentsNumber > 0 ? '('+getNewCommentsNumber+')' : '')} key="commentsInfo">{commentsInfo}</TabPane>
            <TabPane tab="Next Steps" key="nextInfo">{nextInfo}</TabPane>
        </Tabs>
    </React.Fragment>
}

export default withStateHandlers(
    ({ initialCounter = 0 }) => ({
        currentTab: 'main',
    }),
    {
        onTabChange: ({ currentTab }) => (tab) => ({
            currentTab: tab
        }),
    }
)(TumorboardView);