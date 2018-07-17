import React from 'react';
import { Row, Col, Tabs, Card, Table, Icon } from 'antd';
const { TabPane } = Tabs;

const columns = [{
    title: 'Marker',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'Actionable',
    dataIndex: 'actionable',
    key: 'actionable',
    render: (title) => {
        return  title === true ?  <Icon type="check" /> : <Icon type="close" />;
    }
  } ];
const CancerTreatmentMarkers = props => {
    const {treatment = {}} = props;
    let  {markersGrouped=[]} = treatment;
    markersGrouped = markersGrouped.filter(markersGroup => markersGroup.markers.length > 0);
    return <Card
    bordered={false}
    bodyStyle={{ padding: '0 0 32px 0' }}
  >
    <Tabs >
        {markersGrouped.map((markerGrouped, i) => <TabPane tab={markerGrouped.typeText} currentTabKey={i} key={i}>
        
        <Table dataSource={markerGrouped.markers}  key={'name'} columns={columns}  size={'middle'} pagination={false}    />
        </TabPane>)}
    </Tabs>
    </Card>;
}

export default CancerTreatmentMarkers;