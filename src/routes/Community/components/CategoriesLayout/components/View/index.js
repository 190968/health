/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import DiscussionsForm from  './components/CommunityDiscussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
 import Search from  '../../../../containers/Search.js';
// import Search from  './components/Search';
import { Card,Dropdown,Menu, List,Button,Form,Input ,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'
import '../../../../style.css';





class ViewForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.clickJoin = this.clickJoin.bind(this);

    }

    handleChange() {
        console.log("handleChange");
        //this.props.handleBreadcrumbChange("pasha");
    }
    clickJoin = () => {
        const { onSubmit, info} = this.props;
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
        const {name,canJoin, isJoined,articles,discussions,categories} = info;

        let categoriesKV = [];
        categories.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });



        return(

            <div>
                    <Card title={name}  extra={ <Row>
                        <Col span={10}>
                            {canJoin ? isJoined ? <Button type="danger">Leave</Button>:<Button onClick={this.clickJoin}  type="primary">Join</Button> : ''}</Col>
                        <Col offset={1}  span={13}>
                            <Search categories={categoriesKV} />
                        </Col>
                    </Row>
                    }
                    >
                        {
                            articles.length != 0 && <Articles articles={articles} />
                        }
                    </Card>




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