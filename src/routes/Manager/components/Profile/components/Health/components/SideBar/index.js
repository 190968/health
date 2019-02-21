import React from 'react';
import { Card } from 'antd';
import { UserVitals } from '../../../../../../../Health/containers/Vitals';
import Tumorboards from '../../../Dashboard/containers/Tumorboards';
import {UserQualityMeasures} from '../../../../containers/QualMeasures';
import HealthSideBarTabs from './components/Tabs';

const tabList = [{
    key: 'vitals',
    tab: 'Vitals',
  }, {
    key: 'qm',
    tab: 'Quality Measures',
  }];

const HealthSideBar = props => {
    const {user} = props;
    return <React.Fragment>
            <HealthSideBarTabs user={user} activeTab={'vitals'} />
           
            <Tumorboards user={user} />
    </React.Fragment>
}

export default HealthSideBar;