import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import {Layout,Button, List,Collapse} from 'antd';
import Filters from './components/Filters/components'
import PlanWidget from '../../../Plan/components/Plan';
const { Content, Sider } = Layout;
const Panel = Collapse.Panel;




export class PlanstoreLayout extends React.Component {

    constructor(props){
        super(props);
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */
    updateFilters = (filter, values) => {
        const activeFilters = this.props.activeFilters;
        // get all current info of the type
        const activeFilter = activeFilters[filter] || {};

        // update filter by type(category or smth)
        const filter1 = {
            ...activeFilters,
            [filter]: {
                ...activeFilter,
                ...values
            }
        }
        // update the store
        this.props.updateFilterStore(filter1)
    }

    updateZeroFilters = (filter, ) => {
        const activeFilters = {};
        const activeFilter1 =  {};
        const values =  {};
        const filter2 = {
        ...activeFilters,
        [filter]: {
            ...activeFilter1,
            ...values
        }
    }
        this.props.updateZeroFilterStore(filter2);
    }


    render() {
        const planPlaceholder = [];
        for(var i=0; i<8; i++) {
            planPlaceholder.push(  {
                item:   <div style={{width: 200, height: 100 }} className='my-awesome-placeholder'>
                    <RectShape color='#E0E0E0'  style={{width: 200, height: 100}}/>
                    <RectShape color='white'  style={{width: 200, height: 50}}/>
                </div>
            })
        }

        const siderPlaceholder = [];
        for(var i=0; i<4; i++) {
            siderPlaceholder.push(  {
                item:   <div  className='my-awesome-placeholder'>
                <RectShape color='#888888'  style={{width: 199, height: 20}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        </div>
            })
        }


        const {loading, plans, filters, loadMoreEntries, activeFilters} = this.props;
        if (loading) {
            return (
                <Layout style={{padding: '24px 0'}}>
                    <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                           collapsedWidth="0">
                        <List
                            grid={{gutter: 5, md: 1}}
                            dataSource={siderPlaceholder}
                            renderItem={item => (
                                <List.Item>
                                    {item.item}
                                </List.Item>
                            )}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <List
                            grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                            dataSource={planPlaceholder}
                            renderItem={item => (
                                <List.Item>
                                    {item.item}
                                </List.Item>
                            )}
                        />
                    </Content>
                </Layout>)
        }
        return (
            <Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                       collapsedWidth="0">
                    <Filters filters={filters} activeFilters={activeFilters} onSuccess={this.updateFilters} />
                    <Button onClick={this.updateZeroFilters}>Clean filter</Button>
                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}>
                    <List
                        split={false}
                        header="ActionPlans"
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                        pagination={{onChange: this.changePage, total: 50}}
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