import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {
    FormattedMessage,
} from 'react-intl';

import InfiniteScroll from 'react-infinite-scroller';
import styles from './index.less';

import { Form, Row,Col, List,Avatar, Spin, Icon, Card } from 'antd';

class Notifications extends React.Component {

    state = {
        loading: false,
        hasMore: true,
    }


    stopLoading = () => {
        this.setState({
            loading: false,
        });
    }

    handleInfiniteOnLoad = () => {

        //let data = this.state.data;
        this.setState({
            loading: true,
        });

        this.props.loadMore(this.props.endCursor, this.stopLoading);
    }

    render() {
        const { loading, notifications, endCursor, hasMore } = this.props;
        //console.log(notifications)
        //console.log(endCursor)
        if (loading) {
            return <Card bordered={false} loading>Loading...</Card>;
        }
        return (
            <div className="demo-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={notifications}
                    renderItem={message => (
                        <List.Item key={message.id}>

                            <List.Item.Meta
                                avatar={<Avatar style={{ verticalAlign: 'middle', backgroundColor: message.sender.color }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={message.text}
                                description={moment(message.dateSent).calendar()}
                            />



                        </List.Item>
                    )}
                />
                {this.state.loading && <Spin className="demo-loading" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
            </InfiniteScroll>
            </div>
        );
    }
    /*render() {

        const  {loading} = this.props;



        if (loading) {
            return  <Card loading bordered={false} >
                Loading</Card>;
        }
        console.log(this.props);
        const {notifications} = this.props;
        const  {edges} = notifications;
        //console.log(edges);
        return (
             <List
                    style={{ maxHeight: 400, maxWidth:400, overflow: 'auto'}}
                    loading={loading}
                    notificationsSource={edges}
                    renderItem={message => (

                        <List.Item key={message.id}>

                            <List.Item.Meta
                                avatar={<Avatar style={{ verticalAlign: 'middle', backgroundColor: message.sender.color }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={message.text}
                                description={moment(message.dateSent).calendar()}
                            />



                        </List.Item>
                    )}
                />


        );
    }*/
}

export default Notifications;