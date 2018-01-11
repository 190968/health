/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Form,Card,List,Row,Col ,Tabs } from 'antd';
import { withApollo, gql } from 'react-apollo'
const TabPane = Tabs.TabPane;

class ArticlesForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {articles} = this.props;
        console.log(articles);
        let Article = [];
        articles.forEach((item)=>{
           Article.push(

               <TabPane tab={item.title} key={item.id}>
                   <Col span={7}>
                      <h3>{item.title}</h3>
                       {item.text}
                   </Col>
                   <Col offset={7} span={5}>
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

const WrappedArticlesForm = Form.create()(ArticlesForm);
export default withApollo(WrappedArticlesForm);
