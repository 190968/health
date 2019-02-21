import React from 'react';
import { Card, Tabs } from 'antd';
import {UserQualityMeasures} from '../../../../../../containers/QualMeasures';
import { UserVitals } from '../../../../../../../../../Health/containers/Vitals';
import { withTabsState } from '../../../../../../../../../../components/Modal';

const TabPane = Tabs.TabPane;

const HealthSideBarTabs = props => {
    const {user, activeTab, setActiveTab} = props;
    return  <Card type={'tabs'}>
    <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
    <TabPane tab="Vitals" key="vitals"><UserVitals user={user} /></TabPane>
    <TabPane tab="Quality Measures" key="qm"><UserQualityMeasures user={user} noCard /></TabPane>
  </Tabs>
  </Card>
  
}

export default withTabsState(HealthSideBarTabs);
