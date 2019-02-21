import React from 'react';
import {Card} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import Outreach from '../Dashboard/containers/Outreach';
import Transitions from '../../containers/Transitions';
import Visits from '../../containers/Visits';
import CalendarLayout from '../../../../../Calendar/containers/Calendar';
const tabList = [{
    key: 'calendar',
    tab: 'Calendar',
},
    {
        key: 'visits',
        tab: 'Visits',
    },
    {
        key: 'transitions',
        tab: 'Transitions',
    },
    {
        key: 'outreach',
        tab: 'Outreach',
    },
];

export const CalendarPure = props => {
    console.log(props, 'calendarprops');
    const {activeTab, onTabChange} = props;
    //const {subtab:activeTab = 'aps'} = props.match.params;
    // ;

    const contentList = {
        calendar: <CalendarLayout {...props} />,
        visits: <Visits {...props}  />,
        transitions: <Transitions {...props} />,
        outreach: <Outreach {...props} />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTabChange}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'calendar'} = props.match.params;
        return subtab;
    }),
    withHandlers({
        onTabChange: props => key => {
            props.setTab(key);
            props.handleSubTab(key);
        }
    })
);

export const ProfileCalendar = enhance(CalendarPure);
export default ProfileCalendar;