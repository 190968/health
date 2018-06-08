/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import DiscussionsForm from  '../../containers/discussions';
import ListCommunityForm from  '../../components/Communities';
import Plan from  '../../components/PlansList';
import News from  '../../../CategoryNews/components';
import Search from  '../../containers/Search.js';
import { Card,Popconfirm,Button,Row,Col  } from 'antd';
import { withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";
//import '../../../../style.css';
import {
    injectIntl
} from 'react-intl';
import messages from '../../messages';

class Category extends React.Component{
    state = {
        key:'Overview',
        noTitleKey: 'Overview',
}

    constructor(props) {
        super(props);
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    render(){
        //console.log(this.props);
        const {info,loading} = this.props;

        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        console.log(info);
        const {name,canJoin,news, isJoined,articles,discussions,plans} = info;




        const tabListNoTitle = [];
        let contentListNoTitle={};
        articles.forEach((item)=>{
            contentListNoTitle[item.title] = <div>
                <Col span={16}>
                    <h3>{item.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: item.text}} />
                </Col>
                <Col offset={1} span={7}>
                    <img alt="" src={item.thumbs.small} />
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
        return(
            <Card title={name}
                  tabList={tabListNoTitle}
                  onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
            >
                {
                    articles.length !== 0 && contentListNoTitle[this.state.noTitleKey]
                }
            </Card>
        );
    }

}
export default withApollo(withRouter(injectIntl(Category)));
