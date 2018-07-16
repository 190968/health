import React from 'react';
import {Card, Progress,Tabs, Row, Col, Table} from 'antd';

const { TabPane } = Tabs;
const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };

 
const DrugCombination = props => {
    const {combination={}} = props;
    const {maxDrugs=0, drugs=[
        {percentage: 12},
        {percentage: 34}
    ]} = combination;
    return <Card  type={'pure'}  bordered={false}>
        <Tabs className={'topBorderedTab'} tabPosition={'top'} >
            {drugs.map((drug, i) => <TabPane tab={<DrugCombinationBlock drug={drug} currentTabKey={i} />} key={i}>
               <DrugCombinationBlockInfo drug={drug} />
            </TabPane>)}
        </Tabs>
    </Card>
}

export default DrugCombination;


const DrugCombinationBlock = props => {
    const {drug} = props;
    const {percentage=0, combinations=[]} = drug;
    return <Row style={{width:120}}>
        <Col xs={8} style={{textAlign: 'left'}}><DrugCombinationChart value={percentage} /></Col>
        <Col xs={12} offset={1} style={{lineHeight:'1.1em'}}><small>Some Drugs here <br /> Some Drugs here</small></Col>
    </Row>;
}

const DrugCombinationChart = ({value=0}) => {
    return <Progress type="dashboard" percent={value} width={30} />;
}


const columns = [{
    title: 'Drug',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Targeting Description',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Indication recomendations',
    children: [{
        title: 'On Compedia',
        dataIndex: 'age1',
        key: 'age1',
      },
      {
        title: 'Off-Label',
        dataIndex: 'age2',
        key: 'age2',
      }]
  }];


const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    name: 'Bittner',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

const DrugCombinationBlockInfo = props => {
    return <Table dataSource={data} columns={columns}  size={'small'} pagination={false} />;
}