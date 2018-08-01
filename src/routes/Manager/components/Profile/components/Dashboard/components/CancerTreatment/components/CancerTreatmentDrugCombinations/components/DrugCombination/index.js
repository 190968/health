import React from 'react';
import {Card, Progress,Tabs, Row, Col, Table, Icon, Alert} from 'antd';

const { TabPane } = Tabs;
const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };

 
const DrugCombination = props => {
    const {combination={}, treatment} = props;
    const {maxDrugs=0, combos=[]} = combination;
    return <Card  type={'pure'}  bordered={false}>
        <Tabs className={'topBorderedTab'} tabPosition={'top'} >
            {combos.map((drug, i) => <TabPane tab={<DrugCombinationBlock drug={drug} currentTabKey={i} />} key={i}>
               <DrugCombinationBlockInfo drug={drug} treatment={treatment} />
            </TabPane>)}
        </Tabs>
    </Card>
}

export default DrugCombination;


const DrugCombinationBlock = props => {
    const {drug} = props;
    const {score=0, drugtargets=[]} = drug;
    return <Row style={{width:120}}>
        <Col xs={24} style={{textAlign:'center'}} ><DrugCombinationChart value={score} /></Col>
        <Col xs={24} style={{lineHeight:'1.1em', textAlign:'center', marginTop:10}}><small>{drugtargets.map((target, i) => <div key={i}>{target.drug}</div>)}</small></Col>
    </Row>;
}

const DrugCombinationChart = ({value=0}) => {
    return <Progress type="circle" strokeWidth={9} percent={value} width={90} />;
}


 
const DrugCombinationBlockInfo = props => {
    const {drug={}, treatment} = props;
    const {blackbox='', contraindications='',drugtargets=[]} = drug;
    const {drugs=[]} = treatment;

    console.log(drugs, 'drugs');

const columns = [{
    title: 'Drug',
    dataIndex: 'drug',
    key: 'drug',
    render: (title) => {

        const fullInfo = drugs.filter(drug => drug.drugName.toLowerCase() ===  title.toLowerCase());
        
        console.log(fullInfo);
        return <React.Fragment>{title} <Icon type="info-circle-o" /></React.Fragment>;
    }
  }, {
    title: 'Targeting Description',
    dataIndex: 'target',
    key: 'target',
    render: (title, info) => {
        console.log(info);
        const {targets=[]} = info;
        return targets.map((target, i) => {
            const {marker, targetSubstitution} = target;
            return <div key={i}>{marker +' via ' + targetSubstitution}</div>;
        })
       
    }
  }, {
    title: 'Indication Recomendations',
    children: [{
        title: 'On Compedia',
        dataIndex: 'ind',
        key: 'Ind1',
        align: 'center',
        render: (title, info) => {
            return title === true && <Icon type="check" />;
        }
      },
      {
        title: 'Off-Label',
        dataIndex: 'ind',
        key: 'Ind2',
        align: 'center',
        render: (title, info) => {
            return title === false && <Icon type="check" />;
        }
      }]
  }];


    //
    //const footer = renderTableFooter(drug);
    return <React.Fragment>
        <Table dataSource={drugtargets}  key={'drug'} columns={columns}  size={'small'} pagination={false}    />
    {blackbox !== '' && <Alert message={'FDA black-box warning:'} type="error" description={<span dangerouslySetInnerHTML={{__html: blackbox}} />} showIcon style={{marginTop:10}} ></Alert>}
    {contraindications !== '' && <Alert message={'Contraindications:'} type="warning" description={contraindications} showIcon style={{marginTop:10}} ></Alert>}
    </React.Fragment>;
}