/**
 * Created by Pavel on 20.12.2017.
 */
import React from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import {TextRow, RectShape} from 'react-placeholder/lib/placeholders';
import {Layout,Button, List} from 'antd';
import Filters from '../../Filters/components'
const {  Sider } = Layout;

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

    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */

    render() {
        const {loading, filters, activeFilters} = this.props;
        const pageOpts = {onChange: this.changePage, total: 50};
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
        if (loading) {
            return (


                        <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="sm"
                               collapsedWidth="10">
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

               )
        }


        return (
           <div>
                <Sider collapsible collapsed={false} breakpoint="sm"
                       collapsedWidth={0}>
                    <Filters filters={filters} activeFilters={activeFilters} onSuccess={this.updateFilters} />
                    <Button onClick={this.updateZeroFilters}>{<FormattedMessage id="planstore.planstorelayout.cleanfilter" defaultMessage="Clean filter" description="Clean filter" />}</Button>
                </Sider>
               </div>
        )

    }
}

export default PlanstoreLayout