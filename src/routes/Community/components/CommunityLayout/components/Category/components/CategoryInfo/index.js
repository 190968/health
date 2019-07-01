/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import DiscussionsForm from '../../containers/discussions';
import ListCommunityForm from '../../components/Communities';
import Plan from '../../components/PlansList';
import News from '../../../CategoryNews/components';
import Search from '../../containers/Search.js';
import {Card, Popconfirm, Button, Row, Col, Icon} from 'antd';
import {withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";
//import '../../../../style.css';
import {
    injectIntl
} from 'react-intl';
import messages from '../../messages';
import { withActiveNetwork } from '../../../../../../../../components/App/app-context';

class Category extends React.Component {
    state = {
        activeTab: null
        // noTitleKey: 'Overview',
    }

    constructor(props) {
        // console.log(props, 'ppprops');
        super(props);
        const {info} = props;
        const {articles} = info || {};
        const firstArticle = articles[0] || {};
        const {id:firstArticleId} = firstArticle || {};
        this.state = {activeTab:firstArticleId}
    }

    clickJoin = () => {
        const {clickJoin, info} = this.props;
        return clickJoin(info.id);
    }

    clickUNJoin = () => {
        const {clickUNJoin, info} = this.props;
        return clickUNJoin(info.id);
    }


    onTabChange = (key) => {
        this.setState({activeTab: key});
    }

    render() {
        //console.log(this.props);
        const {info, loading, currentNetwork} = this.props;

        if (loading) {
            return (
                <Card loading>Loading!!!</Card>
            );
        }
        const {intl} = this.props;
        // console.log(info);
        const {name, canJoin, news, isJoined, articles, categories, discussions, plans} = info;
        const {networkModuleExists} = currentNetwork;
        const isMcGrawhill = networkModuleExists('is_mcgrawhill')


        let categoriesKV = [];
        categories.forEach((item) => {
            categoriesKV.push({value: item.id, text: item.name});
        });

        const tabListNoTitle = [];
        let contentListNoTitle = {};
        articles.forEach((item) => {
            const {thumbs} = item;
            const {medium} = thumbs || {};
            if (!medium) {
                contentListNoTitle[item.id] = <Row>
                    <Col><h3>{item.title}</h3>
                    <div className={'redactor-styles'} dangerouslySetInnerHTML={{__html: item.text}}/>
                </Col>
            </Row>
            } else {
            contentListNoTitle[item.id] = <Row>
                <Col span={16}>
                    <h3>{item.title}</h3>
                    <div className={'redactor-styles'} dangerouslySetInnerHTML={{__html: item.text}}/>
                </Col>
                <Col offset={1} span={7}>
                    <img src={item.thumbs.medium}/>
                </Col>
            </Row>
            }
        })
        for (let i = 0; i < articles.length; i++) {
            tabListNoTitle.push(
                {
                    key: articles[i].id,
                    tab: articles[i].title,
                }
            )
        }
        return (
            <Card title={name}
                  extra={<Row style={{width: 300}}>
                      <Col span={7}>
                          {canJoin ? isJoined ?
                              <Popconfirm title={intl.formatMessage(messages.popTitle)} onConfirm={this.clickUNJoin}
                                          okText={intl.formatMessage(messages.okText)}
                                          cancelText={intl.formatMessage(messages.cancelText)}>
                                   <Button type="danger"  >{isMcGrawhill ? 'Favorite' : intl.formatMessage(messages.leave)}</Button></Popconfirm> : <Button onClick={this.props.clickJoin} type="orange">{isMcGrawhill ? 'Favorite' : intl.formatMessage(messages.join)}</Button> : ''}
                        </Col>
                      <Col offset={1} span={16}>
                          <Search categories={categoriesKV}/>
                      </Col>
                  </Row>
                  }

                  tabList={tabListNoTitle}

                  activeTabKey={this.state.activeTab}
                  onTabChange={(key) => {
                      this.onTabChange(key);
                  }}
            >
                {
                    articles.length !== 0 && contentListNoTitle[this.state.activeTab]
                }
            </Card>
        );
    }

}

export default withActiveNetwork(withApollo(withRouter(injectIntl(Category))));
