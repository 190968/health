import React from 'react';
import {Layout, List,Input,Icon,Card,Checkbox,Slider } from 'antd';
import PlansList from '../../../Plan/components/PlansList';
import PlanWidget from '../../../Plan/components/Plan';
const { Content, Sider } = Layout;


export class PlanstoreLayout extends React.Component {

    constructor(props){
        super(props);
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }



    render() {
        const price = {
            0: '0$',
            99: {
                label: "99$",
            },
        };
        const marks = {
            0: '0',
            99: {
                label: "99",
            },
        };


        const{loading, plans, filters, loadMoreEntries} = this.props;
        if (loading) {
            return ('Loading');
        }
        console.log(filters[0].code);

        return (
            <Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                       collapsedWidth="0">

                    <Card bordered={true}>
                        <Input
                            placeholder="Search"
                            suffix={<Icon type="search" />}
                        />
                    </Card>
                    <Card title="Category"  bordered={true}>
                        <Checkbox>Family</Checkbox>
                        <Checkbox>Live Well</Checkbox>
                        <Checkbox>Medical</Checkbox>
                        <Checkbox>Prevention</Checkbox>
                    </Card>
                    <Card title="Price" bordered={true}>
                        <Slider marks={price} />
                        <Checkbox>Only free</Checkbox>
                    </Card>
                    <Card title="Gender" bordered={true}>
                        <Checkbox>Male</Checkbox>
                        <Checkbox>Female</Checkbox>
                    </Card>
                    <Card title="Age" bordered={true}>
                        <Slider marks={marks} />
                        <Checkbox>Do not show adult content</Checkbox>
                    </Card>

                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}>

                    <List
                        split={false}
                        header="ActionPlans"
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                        pagination={{onChange: this.changePage, total:50}}
                        dataSource={plans}
                        renderItem={product => (
                            <List.Item key={product.id}>
                                <PlanWidget info={product} key={product.id}/>
                            </List.Item>
                        )}
                    />



                </Content>
            </Layout>)
    }
}

export default PlanstoreLayout