import React from 'react';
import {Row, Col, Tabs, Card, Affix} from 'antd';
import './index.less';

const { TabPane } = Tabs;

export const PageHeader = props => {
    const {title="Empty title", content="", extraContent='', action='', logo='', tabList=[], activeKeyProps='', onTabChange, activeTab, isCollapsed=false} = props;
    const span = action === '' ? 24 : 12;
    const spanExtra = extraContent === '' ? 24 : 12;

    if (isCollapsed) {
        return <Card title={title} extra={action}
                     tabList={tabList}
                     onTabChange={onTabChange}
                     bodyStyle={{padding:0}}
        ></Card>
    }
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
            {(content !== '' || extraContent !== '') && <Col md={spanExtra+2}>
                <div className="pageHeaderDesc">{content}</div>
            </Col>}
            {extraContent !== '' && <Col md={spanExtra-2} style={{textAlign:'right'}}>
                {extraContent !== '' && <div className="pageHeaderExtra">{extraContent}</div>}
            </Col>}
        </Row>
        {tabList &&
        tabList.length > 0 && (
            <Affix><Tabs
                className={'tabs'}
                {...activeKeyProps}
                onChange={onTabChange}
                activeKey={activeTab}
                //tabBarExtraContent={tabBarExtraContent}
            >
                {tabList.map(item => <TabPane tab={item.tab} key={item.key} />)}
            </Tabs></Affix>
        )}



    </div>
}