import React from 'react';
import {Card} from 'antd';
import {withRouter} from 'react-router-dom';
import {compose, withState, withHandlers} from 'recompose';
import Providers from '../../../../containers/Providers';
import Family from '../../../../containers/Family';
import Team from '../../../../containers/Team';
import Advocates from '../../../../containers/Advocates';

const tabList = [{
    key: 'team',
    tab: 'Care Team',
},{
    key: 'family',
    tab: 'Family Members',
    },
    {
        key: 'providers',
        tab: 'Providers',
    },{
        key: 'advocates',
        tab: 'Advocates',
    }];


export const StakeholdersPure = props => {
    const {activeTab} = props;
    // ;

    const contentList = {
        team: <Team {...props} />,
        family: <Family {...props} />,
        providers: <Providers {...props} />,
        advocates: <Advocates {...props} />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => { 
            //history.replace(`#${key}`); 
             props.onTabChange(key);
         }}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'team'} = props.match.params;
        return subtab;
    }),
    withHandlers({
        onTabChange: props => key => {
            props.setTab(key);
            props.handleSubTab(key);
        }
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;