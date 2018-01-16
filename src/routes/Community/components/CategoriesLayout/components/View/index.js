/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import DiscussionsForm from  './components/CommunityDiscussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
import { Card, Button,Form,Input ,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'
const Search = Input.Search;

class ViewForm extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
       // console.log(e.target.value);
        this.props.handleBreadcrumbChange(e.target.value);
    }

    render(){
         const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {name,articles,discussions,categories} = info;




        return(

            <div>

                <Row>

                    {

                        categories.length != 0 ?
                        <Card title={name} extra={
                                                    <Col span={24}>
                                                        <Search
                                                            placeholder="Search for a Communities"
                                                            style={ {height: "100%", width: "100%"} }
                                                        />
                                                    </Col>
                                                  }
                            >
                            <input value={name}
                                   onChange={this.handleChange} />
                        </Card>

                            :
                            <Card title={name}   extra={ <div>
                                                                < Col span={10}> <Button type="primary">Join Community</Button></Col>
                                                                <Col offset={1}  span={13}>
                                                                <Search
                                                                placeholder="Search for a Communities"
                                                                style={ {height:"100%" ,width: "100%"} }
                                                                />
                                                                </Col>
                                                         </div>
                            }
                                >
                            </Card>

                    }

                    <br/>
                    </Row>
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
