import React from 'react';
import DrugCombination from './components/DrugCombination';
import { Row, Col, Tabs, Card } from 'antd';
const { TabPane } = Tabs;

const CancerTreatmentDrugCombinations = props => {
    const {treatment = {}} = props;
    const {drugCombinations=[]} = treatment;
    return <Card
    bordered={false}
    bodyStyle={{ padding: '0 0 32px 0' }}
  >
    <Tabs tabPosition={'left'}>
        {drugCombinations.map((combination, i) => <TabPane tab={combination.maxDrugs+' Drugs Combination'} currentTabKey={i} key={i}><DrugCombination combination={combination} treatment={treatment} /></TabPane>)}
    </Tabs>
    </Card>;
}

export default CancerTreatmentDrugCombinations;