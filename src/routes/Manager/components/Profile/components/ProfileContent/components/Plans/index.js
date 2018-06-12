import React from 'react';
import {Card} from 'antd';
import {compose, withState} from 'recompose';
import ActionPlans from "../../../../components/Dashboard/containers/ActionPlans";
import CarePlans from "../../../../components/Dashboard/containers/CarePlans";

const tabList = [{
    key: 'aps',
    tab: 'Action Plans',
},
    {
        key: 'careplans',
        tab: 'Plans of Care',
    },
    ];


export const StakeholdersPure = props => {
    console.log(props);
    const {activeTab} = props;
    // ;

    const contentList = {
        aps: <ActionPlans {...props} />,
        careplans: <CarePlans {...props} />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => { props.setTab(key); }}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'careplans'} = props.match.params;
        return subtab;
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;