/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import DiscussionsForm from  './components/CommunityDiscussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
import { Card, Button,Form,Input ,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'
import ReactDOM from 'react-dom';
const Search = Input.Search;

class ViewForm extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
      console.log(this.props);
    }

    handleChange() {
        console.log("handleChange");
        //this.props.handleBreadcrumbChange("pasha");
    }
    clickSubmit= (values) => {
        const { onSubmit,info } = this.props;
        return onSubmit(info.id);
    }

    componentDidMount() {
        console.log("componentDidMount");
        window.addEventListener('load', this.handleChange());
    }


    render(){
         const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {name,isJoined,articles,discussions,categories} = info;



        return(

            <div>
                <div className="load" ></div>
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
                            {
                                articles.length != 0 && <Articles articles={articles} />
                            }
                        </Card>

                            :
                            <Card title={name}   extra={ <div>
                                                                < Col span={10}>
                                                                    {isJoined ? <Button type="danger">Unjoin Community</Button>:<Button onClick={this.clickSubmit}  type="primary">Join Community</Button>}</Col>
                                                                <Col offset={1}  span={13}>
                                                                <Search
                                                                placeholder="Search for a Communities"
                                                                style={ {height:"100%" ,width: "100%"} }
                                                                />
                                                                </Col>
                                                         </div>
                            }
                                >
                                {
                                    articles.length != 0 && <Articles articles={articles} />
                                }
                            </Card>

                    }

                    <br/>
                    </Row>



                {
                    categories.length != 0 ?  <ListCommunityForm name={name}  categories={categories} />: null

                }

                <DiscussionsForm name={name} discussions={discussions}  />
            </div>
        );
    }

}

const WrappedViewForm = Form.create()(ViewForm);
export default withApollo(WrappedViewForm);
