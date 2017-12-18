import React from 'react';
import {Layout, List,Collapse} from 'antd';
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

    updateFilters = (filter, values) => {
        const activeFilters = this.props.activeFilters;
        const activeFilter = activeFilters[filter] || {};
        console.log(activeFilter);
        console.log(filter);
        console.log(values);


        const filter1 = {
            ...activeFilters,
            [filter]: {
                ...activeFilter,
                ...values
            }
        }
        /*const filt = Object.assign({}, state, {
            activeFilters: Object.assign({}, state.activeFilters, info)
        });*/

        console.log(filter1);

        this.props.updateFilterStore(filter1)
    }



    render() {
        const {loading, plans, filters, loadMoreEntries, activeFilters} = this.props;
        if (loading) {
            return '<div>loading</div>';
        }
        return (
            <Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                       collapsedWidth="0">
                    <Filters filters={filters} activeFilters={activeFilters} onSuccess={this.updateFilters} />
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