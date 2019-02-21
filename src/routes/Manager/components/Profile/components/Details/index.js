import React from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Table} from 'antd';
import {compose, withState} from 'recompose';
import GeneralInfo from './containers/GeneralInfo';
import QualMeasures from '../../containers/QualMeasures';
import Cohorts from '../../containers/Cohorts';
//import Alerts from '../../containers/Alerts';

const tabList = [{
    key: 'info',
    tab: 'General Info',
},
    {
        key: 'cohorts',
        tab: 'Cohorts',
    },
    // {
    //     key: 'alerts',
    //     tab: 'Alert History',
    // },
    {
        key: 'qms',
        tab: 'Quality Measures',
    }];


export const StakeholdersPure = props => {
    console.log(props);
    const {location,activeTab, history} = props;
    // ;

    return <GeneralInfo {...props} />;
    const contentList = {
        info: <GeneralInfo {...props} />,
        cohorts: <Cohorts {...props} />,
        //alerts: <Alerts {...props} />,
        qms: <QualMeasures {...props} />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => { 
            //const tabName = tab.props.label.toLowerCase();
            //history.replace(`#${key}`); 
            props.setTab(key);
         }}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'info'} = props.match.params;
        return subtab;
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;