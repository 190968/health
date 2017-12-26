import React from 'react';
import Medication from './Medication/components';
import MedicationCoin from './Medication/components/MedicationCoin/containers';
import MedicationInfo from './Medication/components/MedicationInfo/components';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';

import ReactPlaceholder from 'react-placeholder';

import { Table, List, Divider, Card } from 'antd';

export class MedicationPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };


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
        const {takeDaily, takeAsNeeded, takeAtTimes} = info.medicationsByType;

/*
 dataSource={takeAtTimes}
                        renderItem={medication => (<List.Item><Medication key={medication.id} info={medication}  /></List.Item>)}
 */
    //console.log(takeAtTimes.length);
        let columns = [];
        let data = [];

        if (takeAtTimes.length > 0/*type == 'at_times'*/) {
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
                    /*let report = {};
                    if (reports && !reports.some(item => time_info.time === item.time)) {
                        report = reports[0] || {};
                    }*/
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
            console.log(columns);
            console.log(data);

        return (
                <Card title={<FormattedMessage id="plan.medicationpan.medication.card.title2" defaultMessage="Medications for Today" description="Medications for Today" />}>
                    {takeAtTimes.length > 0 &&
                    (   <div><Divider>Take At times</Divider>
                            <Table columns={columns} dataSource={data} scroll={{x: 600}} pagination={false} />
                        </div>
                    )

                    }
                    <Divider>Take Daily</Divider>
                    <List
                        dataSource={takeDaily}
                        grid={{ column: 1}}
                        size="small"
                        renderItem={medication => (<List.Item>
                            <Medication key={medication.id+'d'} info={medication} date={date} /></List.Item>)}
                    />
                    <Divider>Take As Needed</Divider>
                    <List
                        dataSource={takeAsNeeded}
                        grid={{ column: 1}}
                        size="small"
                        renderItem={medication => (<List.Item><Medication key={medication.id+'a'} info={medication} date={date} /></List.Item>)}
                    />
            </Card>
            )
    }
}



export default MedicationPlanBody
