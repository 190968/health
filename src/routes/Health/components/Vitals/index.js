import React from 'react';
import {Tabs, List} from 'antd';
import { formatTrackerValue } from '../../../Plan/components/BiometricPlan/components/TrackerCard/components/TrackerCardValue';
import moment from 'moment';
const TabPane = Tabs.TabPane;

const Vitals = props => {
    const {vitals=[], asTabPane=false} = props;
     
    return <List 
    itemLayout="horizontal"
    dataSource={vitals}
    renderItem={vital => {
        const {label, getLastReport} = vital;
        const {date} = getLastReport || {};
        return  <List.Item>
        <List.Item.Meta
          title={<React.Fragment>
              {label} 
          </React.Fragment>}
          description={moment(date).format('lll')}
        />
        {formatTrackerValue({measurement:vital, report:getLastReport, withUnits:true})}
      </List.Item>
    }}
    
    />;
}
export default Vitals;