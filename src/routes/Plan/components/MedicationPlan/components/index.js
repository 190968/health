import React from 'react';
import Medication from './Medication/components';
import MedicationCoin from './Medication/components/MedicationCoin/containers';
import MedicationSelect from './Medication/components/MedicationSelect/containers';
import MedicationInfo from './Medication/components/MedicationInfo/containers';
import MedicationEditForm from './Medication/components/MedicationEdit/containers';
import moment from 'moment';
import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';

import {Modal, Popover, Table,Button, Icon, List, Divider, Card, Tooltip } from 'antd';

/*const Placeholder = (
    <div>
        <Divider><RectShape  color="#E0E0E0" style={{ width: 90, height: '1em' }} /></Divider>
            <Table columns={[{
                title: <TextBlock color='#E0E0E0' rows={1} />,
                dataIndex: 'name',
                key: 'name',
                width: 300
            }, {
                title: <RectShape  color="#E0E0E0" style={{ width: 90, height: '1em' }} />,
                dataIndex: 'time1',
                key: 'time1',
            }, {
                title: <RectShape  color="#E0E0E0" style={{ width: 90, height: '1em' }} />,
                dataIndex: 'time2',
                key: 'time2',
            }, {
                title: <RectShape  color="#E0E0E0" style={{ width: 90, height: '1em' }} />,
                dataIndex: 'time3',
                key: 'time3',
            }]} dataSource={[{
                key: '1',
                name: <div><RectShape color='#afafaf' style={{ width: '50%', height: '1em'}} /><RectShape color='#E0E0E0' style={{ marginTop:5, width: '60%', height: '0.9em'}} /></div>,
                time1: <RoundShape color='#E0E0E0' style={{ width: 35, height: 35 }} />,
                time2: <RoundShape color='#E0E0E0' style={{ width: 35, height: 35 }} />,
                time3: ''
            }, {
                key: '2',
                name: <div><RectShape color='#afafaf' style={{ width: '80%', height: '1em'}} /><RectShape color='#E0E0E0' style={{ marginTop:5, width: '60%', height: '0.9em'}} /></div>,
                time1: '',
                time2: '',
                time3: <RoundShape color='#E0E0E0' style={{ width: 35, height: 35 }} />
            }]} scroll={{x: 600}} pagination={false} />
        </div>
);*/

export class MedicationPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
            date: props.date,
            addModal:false,
            medId:0
        };

        this.addMedication = this.addMedication.bind(this);
    };
    static propTypes = {
    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
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

    addMedication = (id) => {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:true,
            medId:id
        });
    }

    hideAddMedication = () => {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:false,
            medId:0
        });
    }


    render() {
        //console.log(this.props, 'Load');
        const {info,  loading, user_id} = this.props;
        const {date} = this.state;
        //console.log(date);
        //console.log(this.props);
        if (loading) {
            return (
                <Card loading={true} title={<FormattedMessage id="plan.medicationpan.medication.card.title" defaultMessage="Medications for Today" description="Medications for Today" />}>
                Loading
                </Card>
            );
        }
        const {takeDaily, takeAsNeeded, takeAtTimes} = info.medicationsByType;

        let columns = [];
        let data = [];

        if (takeAtTimes.length > 0/*type == 'at_times'*/) {
            columns = [
                {title: 'Medication', width: 300, dataIndex: 'name', key: 'name', fixed: 'left', className: 'transparent'},
            ];

            takeAtTimes.map(medication => {

                let {reports} = medication;
                //const report = reports && reports[0] || {};
                let medic_times = {
                    key: medication.id+'drug',
                    name: <MedicationInfo user_id={user_id} date={date} info={medication} />
                }

                const at_times = medication.timesPerHour;
                console.log(medication);
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
                    //console.log(time_info);
                    const {time, quantity} = time_info;
                    if (!columns.some(item => time === item.title)) {
                        //console.log(<FormattedTime value={new Date(date+' '+time)} />);
                        columns.push({
                            title: time,
                            dataIndex: 'time_' + time_info.time,
                            key: 'time_' + time_info.id
                        });
                    }
                    //console.log(report);
                    medic_times['time_'+time_info.time] = <MedicationCoin key={time_info.id+'k'} med_id={medication.id} report={report} quantity={quantity} time={time} date={date}/>;
                });


                data.push(
                    medic_times
                );
                //return
            });
        }

        console.log('med render');
        return (
                <Card title={<FormattedMessage id="plan.medicationpan.medication.card.title2" defaultMessage="Medications for {date}" values={{
                    date: <FormattedDate
                        value={new Date(date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    />
                }} description="Medications for Today" />}
                      extra={<div><Button.Group><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}><Button size="small" onClick={() => this.showDate('prev')}><Icon type="left" /></Button></Tooltip><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Button size="small" onClick={() => this.showDate('next')}><Icon type="right" /></Button></Tooltip></Button.Group>
                          <Tooltip title={<FormattedMessage id="medication.add" defaultMessage="Add Medication" />} placement={'bottom'}><Popover content={<MedicationSelect userId={user_id} onSelect={this.addMedication} />} title="Add Medication" trigger="click"><Button size="small" style={{marginLeft:10}} /*onClick={()=>this.addMedication()}*/><Icon type="plus" /></Button></Popover></Tooltip>
                      </div>}>
                    {takeAtTimes.length > 0 &&
                        (   <div><Divider><FormattedMessage id="plan.medication.at_times" defaultMessage="Take At Times" /></Divider>
                                <Table columns={columns} dataSource={data} scroll={{x: 600}} pagination={false} />
                            </div>
                        )
                    }
                    {takeDaily.length > 0 &&
                        (<div>
                        <Divider><FormattedMessage id="plan.medication.daily" defaultMessage="Take Daily" /></Divider>
                        <List
                            dataSource={takeDaily}
                            grid={{ column: 1}}
                            size="small"
                            renderItem={medication => (<List.Item>
                                <Medication user_id={user_id} key={medication.id+'d'} info={medication} date={date} /></List.Item>)}
                        /></div>)
                    }
                    {takeAsNeeded.length > 0 &&
                    (<div>
                        <Divider><FormattedMessage id="plan.medication.as_needed" defaultMessage="Take As Needed" /></Divider>
                        <List
                            dataSource={takeAsNeeded}
                            grid={{ column: 1}}
                            size="small"
                            renderItem={medication => (<List.Item><Medication key={medication.id+'a'} user_id={user_id} info={medication} date={date} /></List.Item>)}
                        />
                        </div>)
                    }

                    {this.state.addModal &&
                        <MedicationEditForm drugId={this.state.medId}
                                            userId={user_id}
                                            title={<FormattedMessage id="plan.medication.add" defaultMessage="Add Medication" description="Add Medication" />}
                                            onCancel={this.hideAddMedication} />}
            </Card>
            )
    }
}



export default MedicationPlanBody
