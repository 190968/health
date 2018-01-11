/**
 * Created by Pavel on 20.12.2017.
 */
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import {Layout,Input, List, Card,Collapse} from 'antd';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';

import PlanWidget from '../../../../../../Plan/components/Plan';
const { Content } = Layout;




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


    render() {
        const planPlaceholder = [];
        for(var i=0; i<8; i++) {
            planPlaceholder.push(  {
                item:   <Card loading >aaa
                </Card>
            })
        }




        const {loading, plans} = this.props;
       // console.log(filters,"plans");
        if (loading) {
            return (

                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <div style={{marginBottom:24}}>
                            <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans" description="Action plan" />}>
                                <Input.Search
                                    placeholder={searchText}
                                    onSearch={value => console.log(value)}

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
                    </Content>
               )
        }
        const pageOpts = {onChange: this.changePage, total: 500, showSizeChanger:true};
        const searchText = 'Search for ActionPlan';//<FormattedMessage id="planstore.search" defaultMessage="Search for ActionPlan" description="Action plan search" />;
        return (

                <Content style={{padding: '0 24px', minHeight: 280}}>
                    <div style={{marginBottom:24}}>
                    <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans" description="Action plan" />}>
                        <Input.Search
                            placeholder={searchText}
                            onSearch={value => console.log(value)}

                            size="large"
                        />
                    </Card>
                    </div>

                    <List
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
                    />
                </Content>
        )
    }
}

export default PlanstoreLayout