/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import DiscussionsForm from  './components/CommunityDiscussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
import { Button,Form,Input,List,Row,Col ,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
const Search = Input.Search;

class ViewForm extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
         const {info,loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {name,articles,discussions,categories} = info;
       // console.log(articles);


        return(

            <div>
                <Row>
                    {
                        categories.length != 0 ?
                            <Col span={18}>  <h2>{name}</h2></Col>
                            :
                            <div>
                                <Col span={15}> <h2>{name}</h2></Col>
                                <Col span={3}> <Button type="primary">Join Community</Button></Col>
                            </div>

                    }

                      <Col span={6}>
                          <Search
                              placeholder="Search for a Communities"
                              style={ {height:"100%" ,width: "100%"} }
                          />
                      </Col>
                    </Row>
                <hr />
                {
                    articles.length != 0 ? <Articles articles={articles} />: null

                }
                {
                    categories.length != 0 ?  <ListCommunityForm name={name} categories={categories} />: null

                }

                <DiscussionsForm name={name} discussions={discussions}  />
            </div>
        );
    }

}

const WrappedViewForm = Form.create()(ViewForm);
export default withApollo(WrappedViewForm);
