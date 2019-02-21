import React from 'react';
import {Row, Col, Button} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';
export const Error404 = props => {
    return <Row className={'errorWrap'}  type="flex" justify="space-between" align="middle">
        <Col md={12}>
        <div className="error-image" style={{backgroundImage: 'url(https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg)'}}></div>
        </Col>
        <Col md={12} style={{textAlign:'center'}}>
            <h1>404</h1>
            <p>Sorry, the page you visited does not exist</p>
            <p><Link to="/"><Button type={'primary'} icon={'left'}>Back to Home</Button></Link></p>
        </Col>
    </Row>
}