import React from 'react';
import {Row, Col} from 'antd';
import './index.less';

export const PageHeader = props => {
    const {title="Empty title", content="", extraContent='', action='', logo=''} = props;
    const span = action === '' ? 24 : 12;
    const spanExtra = extraContent === '' ? 24 : 12;
    return <div className="pageHeader">
        <Row>
            <Col md={span}>
                <h1>{title}</h1>
            </Col>
            {action && <Col md={span} style={{textAlign:'right'}}>
                {action}
            </Col>}
        </Row>
        <Row>
            {(content !== '' || extraContent !== '') && <Col md={spanExtra}>
                <div className="pageHeaderDesc">{content}</div>
            </Col>}
            {extraContent !== '' && <Col md={spanExtra} style={{textAlign:'right'}}>
                {extraContent !== '' && <div className="pageHeaderExtra">{extraContent}</div>}
            </Col>}
        </Row>




    </div>
}