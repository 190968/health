import React from 'react'
import PropTypes from 'prop-types'

import UserPlanEdit from '../../containers/UserPlanEdit';
import PlanReminders from '../../containers/PlanReminders';
import {Icon, Button, Card,Row, Col, Tooltip ,Popover, Dropdown, Menu, Modal } from 'antd';

import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';
import moment from "moment/moment";
import Motivators from '../../../../../User/containers/motivatorsContainer';
import { PageHeader } from '../../../../../../components/Layout/PageHeader';
import './index.less';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { CardExtraSplit } from '../../../../../../components/Card/components/CardExtraSplit';
const confirm = Modal.confirm;
const { Meta } = Card;


export const PlanHeaderNew = props => {
    const {plan} = props;
    let action = {};
    return <PageHeader
        title={plan.title}
        action={action}
    />;
}

export class PlanHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openEditModal:false,
            openReminders:false,// opens reminder modal
            showMotivators:false,
            date: props.date
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.showDate = this.showDate.bind(this);
        this.toggleIntro = this.toggleIntro.bind(this);
        this.showEditPlan = this.showEditPlan.bind(this);
        this.hideEditPlan = this.hideEditPlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
        this.completePlan = this.completePlan.bind(this);
        this.toggleReminders = this.toggleReminders.bind(this);
        this.toggleMotivators = this.toggleMotivators.bind(this);
    };
    static propTypes = {
        plan: PropTypes.object,

    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    };
    showDate = (type) => {

        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.props.setDate(date);
        this.setState({date:date});
        //this.props.loadDate(date, this.props.user_id);
    };

    toggleIntro() {
        this.props.toggleIntro();
    };
    showEditPlan () {
        this.setState({openEditModal:true});
    };
    hideEditPlan () {
        this.setState({openEditModal:false});
    };
    deletePlan() {
        // delete plan here
        const {deletePlan, info} = this.props;
        confirm({
            title: 'Are you sure you want to archive this Plan?',
            content: 'It will be available in archived section',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
               deletePlan(info.id);
            },
            onCancel() {

            },
        });


    };
    completePlan () {
        const {completePlan, info} = this.props;
        confirm({
            title: 'Do you want to complete this Plan?',
            content: 'It will be available in completed plans section',
            onOk() {
                completePlan(info.id);
            },
            onCancel() {
            },
        });
        // delete plan here
        //this.props.completePlan();

    };

    toggleReminders() {
        this.setState({openReminders:!this.state.openReminders});
    }

    toggleMotivators() {
        this.setState({showMotivators:!this.state.showMotivators});
    }

    handleMenuClick(e) {
        switch(e.key) {
            case 'motivators':
                // show motivators modal
                this.toggleMotivators();
                break;
            case 'reminders':
                // show reminders
                this.toggleReminders();
                break;
            case 'edit':
                this.showEditPlan();
                break;
            case 'delete':
                this.deletePlan();
                break;
            case 'complete':
                this.completePlan();
                break;
            default :break;
        }
    }

    render() {
        const {info, plan, user, loading} = this.props;
        if (loading) {

            //return (<div>Loading...</div>);
            return (
                <Card loading>
                    aaa
                </Card>
            );
        }

        //var img = plan.thumb.wide;

        const options = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="motivators">
                    Motivators
                </Menu.Item>
                <Menu.SubMenu title="Actions">
                    <Menu.Item key="edit">
                        Edit
                    </Menu.Item>
                    <Menu.Item key="delete">
                        Delete
                    </Menu.Item>
                    <Menu.Item key="complete">
                        Complete
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="reminders">
                    Reminders
                </Menu.Item>
                <Menu.Item key="print" disabled>
                    <a >Print</a>
                </Menu.Item>
                <Menu.Item key="export" disabled>
                    <a >Export</a>
                </Menu.Item>
            </Menu>
        );

        // let items = [];
        //     items.push({key:'edit', content: <Link to={'/pb/'+plan.id}>Edit</Link>});
        //     items.push( {key:'delete', content: <UserPlanDeleteButton asMenuItem userPlan={info} refetch={refetch} />});
            let extra = (
                <React.Fragment>
                
                <CardExtraSplit>
                 <FormattedDate
                        value={moment(this.state.date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                        weekday='long'
                    />
                </CardExtraSplit>
                <CardExtraSplit>
                    <Button.Group>
                        
                        <Tooltip title={'Previous day'}>
                            <Button size="small" onClick={() => this.showDate('prev')}>
                                <Icon type="left" />
                            </Button>
                        </Tooltip>
                        {/* <Tooltip title={'Select day'}>
                    <DatePicker  onSelect={props.showDate}/>
                </Tooltip> */}
                        <Tooltip title={'Next day'}>
                            <Button size="small" onClick={() => this.showDate('next')}>
                                <Icon type="right" />
                            </Button>
                        </Tooltip>
                    </Button.Group>
                </CardExtraSplit>
                <CardExtraSplit style={{verticalAlign: 'middle'}}>
                    <Tooltip title={'Settings'}><Dropdown overlay={options} trigger={['click']}>
                        <Icon type="setting" />
                    </Dropdown></Tooltip>
                </CardExtraSplit>
                    
                    

                    {this.state.openEditModal &&
                    <UserPlanEdit id={info.id} info={info} plan={plan}
                                  title='Edit Settings' onCancel={this.hideEditPlan}  />}

                    {this.state.openReminders && <PlanReminders upid={info.id} onClose={this.toggleReminders} />}
                    {this.state.showMotivators && <Modal
                        visible={true}
                        destroyOnClose
                        footer={false}

                        maskClosable = {false}
                        keyboard = {false}
                        onCancel={this.toggleMotivators}
                        title={'Motivators'}
                    ><Motivators user_id={user.id} /></Modal>}

                    <CardExtraSplit>
                        
                    </CardExtraSplit>
                </React.Fragment>
            );

        return (
                <Card
                    title={plan.title}
                    type={'planHeader'}
                    bodyStyle={{margin:0, padding:0}}
                    extra={extra}
                    /*cover={<img alt={plan.title} height={300} src={img} />}*/
                    // actions={[, <Icon type="info-circle-o"  onClick={this.toggleIntro} />,  ,
                    //     <Popover content={<div>Messages here</div>} title="Comments" trigger="click"><Icon type="message" /></Popover>]}
                >
                </Card>)
    }
}



export default PlanHeader
