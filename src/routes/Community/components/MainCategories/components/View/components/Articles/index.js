/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Col ,Tabs } from 'antd';
import { withApollo, gql } from 'react-apollo'
const TabPane = Tabs.TabPane;

class Articles extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {articles} = this.props;
        let Article = [];
        articles.forEach((item)=>{
           Article.push(

               <TabPane tab={item.title} key={item.id}>
                   <Col span={16}>
                      <h3>{item.title}</h3>
                       {item.text}
                   </Col>
                   <Col offset={1} span={7}>
                       <img src={item.thumbs.large} />
                   </Col>
               </TabPane>
           )
        })
        return(
            <Card
            >
                <Tabs >
                    {Article}
                </Tabs>
            </Card>
        );
    }

}

const WrappedArticles = Form.create()(Articles);
export default withApollo(WrappedArticles);
