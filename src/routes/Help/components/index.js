import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo'
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom'
import {Card, Tabs, Collapse} from 'antd';
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;



const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Health extends React.Component{

    handleChange = (tabKey) => {
        this.props.history.push(tabKey)
    }
    render() {
        const match = this.props.match;
        const {glossary, faq, loading} = this.props;

        return (
            <Card loading={loading}>
                <Tabs defaultActiveKey={this.props.location.pathname} onChange={this.handleChange}>
                    <TabPane tab={'FAQ'} key={match.url}>
                        <Collapse defaultActiveKey={['1']} bordered={false}>


                            {faq.map((info,i)=>  <Panel header={info.subject} key={i}>
                                {info.text != '' &&  <p>{info.text}</p>}
                                {info.children && <Collapse defaultActiveKey="1">
                                    {info.children.map((child,is) => <Panel header={child.subject} key={is}>
                                        <p>{child.text}</p>
                                    </Panel>)}
                                </Collapse>}
                            </Panel>)}
                        </Collapse>

                    </TabPane>
                    <TabPane tab={'Glossary'} key={match.url+'/glossary'} >

                        <Collapse defaultActiveKey={['1']} bordered={false}>


                            {glossary.map((info,i)=>  <Panel header={info.subject} key={i}>
                                <p>{info.text}</p>
                            </Panel>)}
                        </Collapse>

                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default withApollo(Health);
