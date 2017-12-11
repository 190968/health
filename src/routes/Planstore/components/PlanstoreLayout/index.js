import React from 'react';
import {Layout, List} from 'antd';
import PlansList from '../../../Plan/components/PlansList';
import PlanWidget from '../../../Plan/components/Plan';
const { Content, Sider } = Layout;


export class PlanstoreLayout extends React.Component {
    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

    render() {
        const{loading, plans, loadMoreEntries} = this.props;
        return (
            <Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                       collapsedWidth="0">
                    filters component here
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

                    {/*
             <Row gutter={10}>
                {plans.map(function (product) {
                    return <Col key={product.id} xs={24} sm={24} md={12} lg={8} xl={6} span={12}></Col>;
                })}
            </Row>
             <PlansList plans={} loading={loading} loadMoreEntries={loadMoreEntries} />
              <Pagination defaultCurrent={1} total={50} onChange={this.changePage} />
            */}


                </Content>
            </Layout>)
    }
}

export default PlanstoreLayout