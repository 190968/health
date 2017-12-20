/**
 * Created by Pavel on 20.12.2017.
 */
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import {Layout,Button, List,Collapse} from 'antd';

import PlanWidget from '../../../../../../Plan/components/Plan';
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




        const {loading, plans} = this.props;
       // console.log(filters,"plans");
        if (loading) {
            return (

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
               )
        }
        const pageOpts = {onChange: this.changePage, total: 50};
        return (

                <Content style={{padding: '0 24px', minHeight: 280}}>
                    <List
                        split={false}
                        header="ActionPlans"
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
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