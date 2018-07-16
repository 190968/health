import React from 'react';
import DrugCombination from './components/DrugCombination';
import { Row, Col, Tabs, Card } from 'antd';
const { TabPane } = Tabs;

const CancerTreatmentDrugCombinations = props => {
    const combinations = [
        {maxDrugs: 3},
        {maxDrugs: 2},
        {maxDrugs: 1}
    ];
    return <Card
    bordered={false}
    bodyStyle={{ padding: '0 0 32px 0' }}
  >
    <Tabs tabPosition={'left'}>
        {combinations.map((combination, i) => <TabPane tab={combination.maxDrugs+' Drugs Combination'} currentTabKey={i} key={i}><DrugCombination combination={combination} /></TabPane>)}
    </Tabs>
    </Card>;
}

export default CancerTreatmentDrugCombinations;