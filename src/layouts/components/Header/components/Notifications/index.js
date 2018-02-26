import React, { PropTypes } from 'react';
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment';
import Loading from 'components/Loading';
import {
    FormattedMessage,
} from 'react-intl';

import InfiniteScroll from 'react-infinite-scroller';
import styles from './index.less';

import { Popconfirm, Row, Col,Button, Modal, List, Avatar, Spin, Icon, Card } from 'antd';
import messages from "../RightMenu/components/NotificationBadge/messages";
const confirm = Modal.confirm;

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


    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && nextProps.totalCount !== this.props.totalCount) {
            this.props.handleTotalNewNotifications(nextProps.totalCount);
        }
    }

    componentDidUpdate(prevProps) {


        if (!this.props.loading) {
           // this.props.handleTotalNewNotifications(11);
        }
    }

    handleNotification = (e, id, approved) => {
        e.preventDefault();
        this.props.handleNotification(id, approved).then(({data}) => {

            if (!approved) {
                return;
            }
            // check on notification
            const {id,
                action,
                actionId,
                userId,
                date} = data.handleNotification;

            switch(action) {
                case 'goUser':
                    //'description' => 'Go to user profile by User ID'
                    this.props.history.push('/u/'+userId);
                    break;
                case 'goUserPlan':
                    //'description' => 'Go to user Plan by User Plan ID'
                    this.props.history.push('/plan/'+actionId);
                    break;
                case 'goPlanstorePlan':
                    //'description' => 'Go to planstore plan by Plan ID'
                    this.props.history.push('/planstore/plan/'+actionId);
                    break;
                case 'getUserPlan':
                    // 'description' => 'Get User plan By User Plan ID. Show page where we can get plan by User Plan ID. REQUEST ID IS MANDATORY TO PASS'
                    break;
                case 'goPlanBuilderPlan':
                    // 'description' => 'Go to plan builder plan by Plan ID'
                    this.props.history.push('/pb/'+actionId);
                    break;
                case 'getPlan':
                    // 'description' => 'Get Plan by Plan ID.  REQUEST ID IS MANDATORY TO PASS'
                    this.props.history.push('/planstore/plan/'+actionId+'/#download');
                    break;
                case 'goBiometricPlan':
                    // 'description' => 'Go to biometric plan by User ID'
                    this.props.history.push('/u/'+userId+'/biometric/#date='+date);
                    break;
                case 'goMedicationPlan':
                    // 'description' => 'Go to medication plan by User ID'
                    this.props.history.push('/u/'+userId+'/medication/#date='+date);
                    break;
                case 'goAssessment':
                    //  'description' => 'Go to assessment by ID'
                    this.props.history.push('/assessment/'+actionId);
                    break;
                case 'goReferral':
                    this.props.history.push('/referral/'+actionId);
                    break;
                case 'goDiscussion':
                    this.props.history.push('/community/discussion/'+actionId);
                    break;
                case 'goComment':
                    this.props.history.push('/community/discussion/comment/'+actionId);
                    break;
                case 'goCalendar':
                    this.props.history.push('/calendar');
                    break;
                case 'goTask':
                    this.props.history.push('/tasks/'+actionId);
                    break;
                case 'goHealth':
                    this.props.history.push('/u/'+userId+'/health');
                    break;
                case 'goTransition':
                    // 'description' => 'Go to Transition by User ID and ID'
                    this.props.history.push('/u/'+userId+'/transition');
                    break;
                case 'goDME':
                    this.props.history.push('/dme/'+actionId);
                    break;
                case 'goPromise':
                    this.props.history.push('/u/'+userId+'/promises/'+actionId);
                    break;
                case 'goCommitment':
                    this.props.history.push('/u/'+userId+'/commitments/'+actionId);
                    break;
                case 'goMedication':
                    // 'description' => 'Go to Medication by ID and User ID'
                    this.props.history.push('/u/'+userId+'/medication/#'+actionId+'&date='+date);
                    break;
                case 'goTracker':
                    // 'description' => 'Go to Tracker by ID and User ID'
                    this.props.history.push('/u/'+userId+'/biometric/#'+actionId+'&date='+date);
                    break;
            }
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

        if (loading) {
            return <Loading />;
        }

        if (notifications.length === 0) {
            return <div className="ant-list-empty-text">No notifications</div>
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
                        <List.Item key={message.id} >

                            <List.Item.Meta
                                avatar={<Avatar style={{ verticalAlign: 'middle', backgroundColor: message.sender.color }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={message.text}
                                description={<Row type="flex" justify="space-between" >
                                    <Col xs={12}>{moment(message.dateSent).calendar()}</Col>
                                    {message.isRequest && <Col xs={12}><Popconfirm title="Are you sure decline this request?" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                             onConfirm={ (e) => this.handleNotification(e, message.id, false)}
                                    ><Button size='small' type="dashed" >Decline</Button></Popconfirm> <Button size='small' type="primary" ghost onClick={ (e) => this.handleNotification(e, message.id, true)}>Approve</Button></Col>}
                                </Row>}
                            />
                        </List.Item>
                    )}
                />
                {this.state.loading && <Spin className="demo-loading" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
            </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(Notifications);