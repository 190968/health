import React from 'react';
import {Col,Row} from 'antd';
import PlanstoreSider from './components/Sider'
import {PlanstoreContent} from './containers/PlanstoreContent';
import { LoadingBox } from '../../../../components/Loading';

export const PlanstoreLayout = props => {
    const {loading, ...otherProps} = props;
    if (loading) {
        return <LoadingBox />
    }
    return (
        <Row gutter={20} className={'tour-planstore-all'}>
          <Col xs={24} md={8} lg={6} xl={4}>
              <PlanstoreSider loading={loading} {...otherProps} />
          </Col>
          <Col xs={24} md={16} lg={18} xl={20}>
              <PlanstoreContent loading={loading} {...otherProps} />
          </Col>
        </Row>
       )
}

export default PlanstoreLayout;