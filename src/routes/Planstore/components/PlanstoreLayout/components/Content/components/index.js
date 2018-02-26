/**
 * Created by Pavel on 20.12.2017.
 */
import React from 'react';
import {Layout,Input, Col,List, Card,Collapse} from 'antd';
import {
    FormattedMessage
} from 'react-intl';

import PlanWidget from '../../../../../../Plan/components/Plan';
const { Content } = Layout;




export class PlanstoreLayout extends React.Component {

    constructor(props){
        super(props);

        this.search = this.search.bind(this);
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

    search = (value) => {
        this.props.updateSearchStore(value);
    }

    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */


    render() {
        const planPlaceholder = [];
        for(var i=0; i<6; i++) {
            planPlaceholder.push(  {
                item:   <Card loading >aaa
                </Card>
            })
        }




        const {loading, plans, search} = this.props;

        if (loading) {
            return (
                <Col>
                        <div style={{marginBottom:24}}>
                            <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans" description="Action plan" />}>
                                <Input.Search
                                    placeholder={searchText}
                                    onKeyUp={this.search}
                                    defaultValue={search}
                                    size="large"
                                />
                            </Card>
                        </div>

                        <List
                            grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                            dataSource={planPlaceholder}

                            renderItem={item => (
                                <List.Item>
                                    {item.item}
                                </List.Item>
                            )}
                        />
                    </Col>
               )
        }
        const pageOpts = {onChange: this.changePage, total: this.total, hideOnSinglePage:true/*, showSizeChanger:true*/};
        const searchText = 'Search for ActionPlan';//<FormattedMessage id="planstore.search" defaultMessage="Search for ActionPlan" description="Action plan search" />;
        return (

         <div>
                    <div style={{marginBottom:12}}>
                    <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans" description="Action plan" />}>
                        <Input.Search
                            placeholder={searchText}
                            onSearch={this.search}
                            defaultValue={search}
                            size="large"
                        />
                    </Card>
                    </div>

             {plans.length > 0 ? <List
                        split={false}

                        loading={loading}
                        grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                        pagination={pageOpts}
                        dataSource={plans}
                        renderItem={product => (
                            <List.Item key={product.id}>
                                <PlanWidget info={product} key={product.id}/>
                            </List.Item>
                        )}
             /> : <Card style={{textAlign:'center'}}>No ActionPlans Found</Card>}
                </div>
        )
    }
}

export default PlanstoreLayout