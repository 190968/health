import React from 'react';
import { Row, Col } from 'antd';
import ProgramsCatalogMain from './containers/Main';

const ProgramsCatalog = props => {

    return <Row>
        {/* <Col md={6}>sider</Col> */}
        <Col><ProgramsCatalogMain {...props} /></Col>
    </Row>
}

export default ProgramsCatalog;
