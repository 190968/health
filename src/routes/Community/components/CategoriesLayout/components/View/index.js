/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import DiscussionsForm from  './containers/discussions';
import ListCommunityForm from  './components/ListCommunities';
import Articles from  './components/Articles';
import Plan from  './components/Plan';
 import Search from  '../../../../containers/Search.js';
// import Search from  './components/Search';
import { Card,Dropdown,Menu, List,Button,Form,Input ,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'
import '../../../../style.css';





class ViewForm extends React.Component{
    state = {
        key:'Overview',
        noTitleKey: 'Overview',
    }
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
    clickUNJoin = () => {
        const { onClick,info} = this.props;
        return onClick(info.id);
    }

    componentDidMount() {
        console.log("componentDidMount");
        window.addEventListener('load', this.handleChange());
    }
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render(){
         const {info,loading} = this.props;




        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        const {name,canJoin, isJoined,articles,discussions,categories,plans} = info;
console.log(plans,"=========================================")
        let categoriesKV = [];
        categories.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });

        console.log(this.props);

        const tabListNoTitle = [];
        let contentListNoTitle={};
        articles.forEach((item)=>{
            contentListNoTitle[item.title] = <div>
                <Col span={16}>
                    <h3>{item.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: item.text}} />
                </Col>
                <Col offset={1} span={7}>
                    <img src={item.thumbs.large} />
                </Col>
                </div>
        })
        for(let i=0;i<articles.length;i++)
        {


            tabListNoTitle.push(
            {
                key: articles[i].title,
                tab: articles[i].title,
            }
            )
        }
        console.log(tabListNoTitle);
        console.log(contentListNoTitle);
        return(

            <div>
                    <Card title={name}  extra={ <Row>
                        <Col span={10}>
                            {canJoin ? isJoined ? <Button onClick={this.clickUNJoin} type="danger">Leave</Button>:<Button onClick={this.clickJoin}  type="primary">Join</Button> : ''}</Col>
                        <Col offset={1}  span={13}>
                            <Search categories={categoriesKV} />
                        </Col>
                    </Row>
                    }
                          tabList={tabListNoTitle}
                          onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                    >
                        {
                            articles.length != 0 && contentListNoTitle[this.state.noTitleKey]
                        }
                    </Card>




                {
                    categories.length != 0 ?  <ListCommunityForm name={name}  categories={categories} />: null

                }

                <DiscussionsForm name={name} discussions={discussions}  />
                <Plan />
            </div>
        );
    }

}

const WrappedViewForm = Form.create()(ViewForm);
export default withApollo(WrappedViewForm);
