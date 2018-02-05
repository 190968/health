import React from 'react';
import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';

import TrackerSelect from './Biometric/components/TrackerSelect/containers';
import TrackerField from  './Biometric/components/TrackerField/containers';
import {TrackerAddForm, TrackerEditForm} from '../../BiometricPlan/components/Biometric/components/TrackerModal/containers'
import TrackerChartPopup from "../../../components/Tracker/components/TrackerChartPopup";
import {  Modal, Menu, Dropdown, Popover,Table, List,Icon,Button, Card, Tooltip, Popconfirm } from 'antd';
import moment from "moment/moment";
import Motivators from '../../../../User/containers/motivatorsContainer';

export class BiometricPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
            visible: false,
            addModal: false,
            showMotivatorsModal: false,
            amid: 0,
            date: props.date,
        };
        this.editClick = this.editClick.bind(this);
        this.closeClick = this.closeClick.bind(this);
        this.hideAddTracker = this.hideAddTracker.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.addTracker = this.addTracker.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.toggleMotivators = this.toggleMotivators.bind(this);
    };
    static propTypes = {
    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    }
    editClick = (e, info) => {
        this.setState({visible: true, amid:info.key});
    }
    deleteClick = (e, item) => {
        const {user_id, trackerDelete } = this.props;
        const {date} = this.state;
        return trackerDelete(item.key, user_id, date);//, !this.state.isClicked, this.toggleCoin);
    }
    closeClick () {
        this.setState({visible: false, amid:0});
    }
    addTracker (id) {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:true,
            amid:id
        });
    }

    handleMenuClick(e) {

        switch(e.key) {
            case 'motivators':
                // show motivators modal
                this.toggleMotivators();
                break;
        }
    }

    toggleMotivators() {
        this.setState({showMotivatorsModal:!this.state.showMotivatorsModal});
    }
    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.setState({date:date});
        this.props.loadDate(date, this.props.user_id);
    };

    hideAddTracker ()  {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:false,
            amid:0
        });
    }
    render() {
        const {info, loading, user_id} = this.props;
        if (loading) {
            return (
                <Card loading>
                Loading...
                </Card>
            );
        }
        const {date} = this.state;

        const {columns, trackers} = info;
        const listColumns = [
            { title: '', dataIndex: 'name', key: 'name', render: (text, item) =>  { return <div>{text} <TrackerChartPopup item={item.item} userId={user_id} date={date} label={item.label} /> <Icon onClick={(e)=> this.editClick(e, item)} type="edit" /> <Popconfirm title="Are you sure you want to delete this tracker?" onConfirm={(e)=> this.deleteClick(e, item)}  okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm></div>}},
           //
            { title: '', dataIndex: 'input', key: 'input', width: 150  },
            //{ title: '', dataIndex: 'icon', key: 'acts', width: 50}
        ];

        const tableColumns = [
            { title: '', dataIndex: 'name', key: 'name', render: (text, item) =>  { return <div>{text} <TrackerChartPopup item={item.item} userId={user_id} date={date} label={item.label} /> <Icon onClick={(e)=> this.editClick(e, item)} type="edit" /> <Popconfirm title="Are you sure you want to delete this tracker?" onConfirm={(e)=> this.deleteClick(e, item)}  okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm></div>} },
        ];
        // adding columns
        columns.map(column => {
            tableColumns.push({ title: column.name, dataIndex: 'col_'+column.id, key: column.id, width: 150 },)
        });

        const data = []
        const dataList = []

        // normalize trackers
        trackers.map(tracker => {
            const tracker_columns = tracker.columns;
            const timesToReport = tracker.timesToReport;
            const measurement = tracker.measurement;
            const reports = measurement.reports;
            //console.log(measurement);
            // if we have columns - put it into columns table
            if (tracker_columns.length > 0) {
                let tracker_column_info = { key: tracker.id, name: measurement.label, item:measurement, input: <TrackerField info={tracker} date={date} list_id={info.id} />};
                tracker_columns.map(column_id => {
                    //console.log(column_id);
                    let inputFields = [];
                    for (var i=0;i<timesToReport;i++) {
                        let report = null;
                        if (reports) {
                            const report_arr = reports.filter((e) => {
                                return e.reportKey === i && e.columnId === column_id
                            });

                            //console.log(report_arr);
                            if (report_arr.length > 0) {
                                report = report_arr[0];
                            }
                        }
                        //console.log(report);
                        inputFields.push(<TrackerField info={tracker} date={date} column={column_id} report={report} reportKey={i} list_id={info.id} />);
                    }

                    tracker_column_info['col_'+column_id] = <List
                        size="small"
                        dataSource={inputFields}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />});

                data.push(tracker_column_info);
            } else {
                // if not -  just to table
                let inputFields = [];
                for (var i=0;i<timesToReport;i++) {
                    let report = null;
                    //console.log(reports);
                    if (reports) {
                        const report_arr = reports.filter((e) => e.reportKey === i);
                        if (report_arr.length > 0) {
                            report = report_arr[0];
                        }
                    }
                   // console.log(report);
                    inputFields.push(<TrackerField info={tracker} date={date} report={report} reportKey={i} list_id={info.id} />);
                }
                //
                let trackerName = measurement.label;

                dataList.push({ key: tracker.id, item:measurement, name: trackerName, input: <List
                    size="small"
                    dataSource={inputFields}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />});
            }

        });

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="motivators" on>Motivators</Menu.Item>
                <Menu.Item disabled key="commitment">Make a Commitment</Menu.Item>
                <Menu.Item disabled key="promise">Make a Promise</Menu.Item>
                <Menu.Item disabled key="print">Print</Menu.Item>
            </Menu>
        );

        return (

            <Card title={<FormattedMessage id="plan.trackers.medication.card.title2" defaultMessage="Trackers for {date}" values={{
                date: <FormattedDate
                    value={new Date(date)}
                    year='numeric'
                    month='long'
                    day='2-digit'
                />
            }} description="Trackers for Today" />}

                  extra={<div><Button.Group><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}><Button size="small" onClick={() => this.showDate('prev')}><Icon type="left" /></Button></Tooltip><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Button size="small" onClick={() => this.showDate('next')}><Icon type="right" /></Button></Tooltip></Button.Group>
                      <Button.Group style={{marginLeft:10}}>
                          {/*<Tooltip title="Summary"><Button size="small" ><Icon type="area-chart"  /></Button></Tooltip>*/}
                          <Tooltip title="Chat"><Button size="small" ><Icon type="message"  /></Button></Tooltip>
                          <Tooltip title="Settings"><Dropdown overlay={menu}   >
                              <Button size="small" ><Icon type="setting" /></Button>
                          </Dropdown></Tooltip>
                          <Tooltip title={<FormattedMessage id="medication.add" defaultMessage="Add Medication" />} placement={'top'}><Popover content={<TrackerSelect userId={user_id} onSelect={this.addTracker} />} title="Add Tracker" trigger="click" placement={'bottom'} ><Button size={"small"} ><Icon type="plus"  /></Button></Popover></Tooltip>
                      </Button.Group>
                  </div>}>


                {dataList.length === 0 && data.length === 0 && <div className="ant-list-empty-text">No trackers</div>}
                {dataList.length > 0 && <Table size="middle"  columns={listColumns} dataSource={dataList} scroll={{x: 600}} showHeader={false} pagination={false} />}
                {data.length > 0 && <Table size="middle" columns={tableColumns} dataSource={data} scroll={{x: 600}} pagination={false} />}



                {this.state.showMotivatorsModal && <Modal
                    visible={true}
                    destroyOnClose
                    footer={false}

                    maskClosable = {false}
                    keyboard = {false}
                    onCancel={this.toggleMotivators}
                    title={'Motivators'}

                ><Motivators user_id={user_id} /></Modal>}
                {this.state.addModal &&
                <TrackerAddForm amid={this.state.amid}
                                    userId={user_id}
                                    date={date}
                                    title={<FormattedMessage id="plan.tracker.add" defaultMessage="Add" description="Add" />}
                                onCancel={this.hideAddTracker} />}

                {this.state.visible &&
                <TrackerEditForm id={this.state.amid}
                              userId={user_id}
                              date={date}
                              title={<FormattedMessage id="plan.biometricplan.biometric.trackermodal.modal.title" defaultMessage="Edit " description="Edit" />}
                              onCancel={this.closeClick} />}

            </Card>
            )
    }
}



export default BiometricPlanBody
