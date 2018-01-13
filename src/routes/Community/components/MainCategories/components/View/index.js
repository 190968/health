/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import DiscussionsForm from  './components/CommunityDiscussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
import { Button,Form,Input,Breadcrumb ,Row,Col ,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
const Search = Input.Search;
let Crumb = [];
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
<<<<<<< HEAD
        const {name,articles,discussions,categories} = info;
        console.log(info);
=======
        const {id,name,articles,discussions,categories} = info;
       // console.log(articles);
>>>>>>> 0981710ea7fe76894f80ded55d68021908bd4fda

        Crumb.push(
            <Breadcrumb.Item><Link to={"/community/"+id}>{name}</Link></Breadcrumb.Item>
        )


        return(

            <div>
                <Row>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
                        {Crumb}
                    </Breadcrumb>
                </Row>
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
