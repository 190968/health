import React from 'react';
import {Row, Col, Tabs} from 'antd';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {Comments} from "../../../../../../components/Comments/index";
import {withStateHandlers} from 'recompose';
import {TumorboardElements} from "./components/TumorboardElements/index";

const TabPane = Tabs.TabPane;

export const TumorboardView = props => {
    const {tumorboard={}, onTabChange, currentTab='main'} = props;
    const {id, title='', startDate, endDate, notes='', location='', video='', patient={}, lead=null, admin=null, elements=[]} = tumorboard;
    //const {id:leadUid=''} = lead;
    //const {id:adminUid=''} = admin;
    let userId = '';
    let items = [
        ['Patient', [<AvatarWithName info={patient} />, <span style={{verticalAlign:'middle'}}>, {patient.age+', '+patient.genderText}</span>]],
        ['Title', title],
        ['Start Date', moment(startDate).format('L')],
    ];
    if (lead) {
        items.push(['Lead', <AvatarWithName info={lead} />]);
    }
    if (admin) {
        items.push(['Admin', <AvatarWithName info={admin} />]);
    }
    if (endDate) {
        items.push(['End Date', (endDate ? moment(endDate).format('L') : '')]);
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

    const mainInfo = items.map(item => {
        return <Row style={{marginBottom:5}}>
            <Col span={6}>{item[0]}</Col>
            <Col span={18}>{item[1]}</Col>
        </Row>
    });
    const elementsInfo = <TumorboardElements elements={elements} editable={true} userId={userId} />;
    const commentsInfo = <Comments id={id} type="tumorboard" title="Comments" userId={userId} />;

    const nextInfo = <div>a</div>;




    return <React.Fragment>
        <Tabs  defaultActiveKey="mainInfo" size="small">
            <TabPane tab="Overview" key="mainInfo">{mainInfo}</TabPane>
            <TabPane tab="Elements" key="elementsInfo">{elementsInfo}</TabPane>
            <TabPane tab="Comments" key="commentsInfo">{commentsInfo}</TabPane>
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