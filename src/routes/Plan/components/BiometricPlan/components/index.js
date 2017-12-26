import React from 'react';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';

import ReactPlaceholder from 'react-placeholder';
import TrackerField from  './Biometric/components/TrackerField/containers';
import ModalTracker from '../../BiometricPlan/components/Biometric/components/TrackerModal/components'
import { Table, List,Icon, Divider, Card } from 'antd';

export class MedicationPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };
    editClick = () => {
        console.log("editClick");
    }
    closeClick = () => {
        console.log("closeClick");
    }

    render() {
        const {info, date, loading} = this.props;
        if (loading) {
            const info = {medicationsByType: {takeDaily:1, takeAsNeeded:1}};
            return (
                <Card title={<FormattedMessage id="plan.medicationpan.medication.card.title" defaultMessage="Medications for Today" description="Medications for Today" />}>
                <ReactPlaceholder showLoadingAnimation ready={!loading} type="media" rows={5} >
                    a
                </ReactPlaceholder>
                </Card>
            );
        }
        //console.log(info);
        const {columns, trackers} = info;

        const listColumns = [
            { title: '', dataIndex: 'name', key: 'name' },
            { title: '', dataIndex: 'icon', key: 'icom' },
            { title: '', dataIndex: 'input', key: 'input' },
        ];

        const tableColumns = [
            { title: '', dataIndex: 'name', key: 'name' },
        ];
        columns.map(column => {
            //console.log(column.id);
            tableColumns.push({ title: column.name, dataIndex: 'col_'+column.id, key: column.id },)});
        tableColumns.push({ title: 'Action', dataIndex: '', key: 'x', render: (info) => <a href="#">{info.name}</a> });

        const data = []
        const dataList = []
            /*{ key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
            { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
            { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
        ];*/

        // normalize trackers
        trackers.map(tracker => {
            //console.log(tracker);
            const tracker_columns = tracker.columns;
            const timesToReport = tracker.timesToReport;
            const measurement = tracker.measurement;
            const reports = measurement.reports;
            //console.log(reports);
            // if we have columns - put it into columns table
            if (tracker_columns.length > 0) {
                let tracker_column_info = { key: tracker.id, name: measurement.label, input: <TrackerField info={tracker} date={date} list_id={info.id} />};
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
                        inputFields.push(<div><TrackerField info={tracker} date={date} column={column_id} report={report} reportKey={i} list_id={info.id} /></div>);
                    }

                    tracker_column_info['col_'+column_id] = <List
                        size="small"
                        dataSource={inputFields}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />});

                data.push(tracker_column_info);
            } else {
                let inputFields = [];
                for (var i=0;i<timesToReport;i++) {
                    let report = null;
                    if (reports) {
                        const report_arr = reports.filter((e) => e.reportKey === i);
                        if (report_arr.length > 0) {
                            report = report_arr[0];
                        }
                    }
                    inputFields.push(<div><TrackerField info={tracker} date={date} report={report} reportKey={i} list_id={info.id} /></div>);
                }
               // console.log(inputFields);
                //
                dataList.push({ key: tracker.id, icon:<div><Icon onClick={this.editClick}  style={{ fontSize: 18 }} type="edit" /> <Divider type="vertical" /><Icon onClick={this.closeClick}  style={{ fontSize: 18 }} type="close" /> <Divider type="vertical" /></div> ,name:measurement.label, input: <List
                    size="small"
                    dataSource={inputFields}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />});
            }

        });

/*
 dataSource={takeAtTimes}
                        renderItem={medication => (<List.Item><Medication key={medication.id} info={medication}  /></List.Item>)}
 */
    //console.log(takeAtTimes.length);
        /*let columns = [];
        let data = [];

        if (takeAtTimes.length > 0) {
            columns = [
                {title: 'Medication', width: 300, dataIndex: 'name', key: 'name', fixed: 'left', className: 'transparent'},
            ];
            let cols_by_time = {};// columns by time to avoid duplicates




            takeAtTimes.map(medication => {

                let {reports} = medication;
                //console.log(time_info);
                //const report = reports && reports[0] || {};
                let medic_times = {
                    key: medication.id+'drug',
                    name: <MedicationInfo info={medication} />
                }

                const at_times = medication.timesPerHour;
                //console.log(reports);
                at_times.map(function (time_info) {


                    let report = {};
                    if (reports) {
                         report = reports.filter((e) => e.time === time_info.time);
                         if (report.length > 0) {
                             report = report[0];
                         }
                    }
                    //console.log(report);

                        //.map(e => e)

                    const time = time_info.time;
                    if (!columns.some(item => time_info.time === item.title)) {

                        columns.push({
                            title: time,
                            dataIndex: 'time_' + time_info.time,
                            key: 'time_' + time_info.id
                        });
                    }
                    medic_times['time_'+time_info.time] = <MedicationCoin key={time_info.id+'k'} med_id={medication.id} report={report} quantity={time_info.quantity} time={time} date={date}/>;
                });


                data.push(
                    medic_times
                );
                //return
            });
        }
*/

        return (
                <Card title={<FormattedMessage id="plan.biometric.title" defaultMessage="Trackers for Today" description="Trackers for Today" />}>
                    {/*<ModalTracker />*/}
                    <Divider>Report anytime</Divider>
                    <Table size="default" columns={listColumns} dataSource={dataList} scroll={{x: 600}} showHeader={false} pagination={false} />
                    <Divider>Report at times</Divider>
                    <Table size="small" columns={tableColumns} dataSource={data} scroll={{x: 600}} pagination={false} />
            </Card>
            )
    }
}



export default MedicationPlanBody
