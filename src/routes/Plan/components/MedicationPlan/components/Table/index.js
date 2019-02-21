import React from 'react';
//import Medication from './Medication/components';
import { MedicationCoin } from './containers/Coin';
import { MedicationInfo } from './containers/Info';
// import MedicationInfo from '../Medication/components/MedicationInfo/containers';
import '../index.css';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

import { Avatar, Dropdown, Popover, Table, Button, Icon, Modal, Divider, Card, Tooltip, Col } from 'antd';

const MedicationsTable = props => {
    const { medicationPlan, loading, date,  user, medicationType, ...otherProps } = props;
        
    const {medications=[]} = medicationPlan || {};

    const takeAtTimes = medications.filter(m => m.type === 'at_times');
    const takeAsNeeded = medications.filter(m => m.type === 'as_needed');
    const takeDaily = medications.filter(m => m.type === 'along_day');
    // const { takeDaily, takeAsNeeded, takeAtTimes } = medicationPlan.medicationsByType;

    let columns = [];
    let takeDailyColumns = [];
    let takeDailyData = [];
    let takeAsNeededColumns = [];
    let takeAsNeededData = [];
    let data = [];

    const imgColumn = {
        title: '',
        width: 35,
        // dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        className: 'transparent',
        render: info => {
            console.log(info, 'info');
            const {medication} = info || {};
            const {image} = medication || {};
            return <Avatar shape="square" icon="camera" src={image} />;
        }
    };

    if (takeAtTimes.length > 0 /*type == 'at_times'*/) {
        columns = [
            imgColumn,
            {
                title: 'Medication',
                width: 400,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                className: 'transparent'
            }
        ];

        takeAtTimes.map((medication) => {
            let { reports } = medication;
            //const report = reports && reports[0] || {};
            let medic_times = {
                key: medication.id + 'drug',
                medication: medication,
                name: <MedicationInfo user={user} date={date} medication={medication} medicationPlan={medicationPlan} />
            };

            const at_times = medication.timesPerHour;

            at_times.map(function(time_info) {
                let report = {};
                if (reports) {
                    report = reports.filter((e) => e.time === time_info.time);
                    if (report.length > 0) {
                        report = report[0];
                    }
                }

                const { time, quantity } = time_info;
                if (!columns.some((item) => time === item.time)) {
                    columns.push({
                        time: time,
                        title: <FormattedTime value={new Date(date + ' ' + time)} />,
                        dataIndex: 'time_' + time_info.time,
                        key: 'time_' + time_info.id
                    });
                }
                medic_times['time_' + time_info.time] = (
                    <MedicationCoin
                        key={time_info.id + 'k'}
                        user={user}
                        medicationPlan={medicationPlan}
                        medication={medication}
                        report={report}
                        quantity={quantity}
                        time={time}
                        date={date}
                    />
                );
                return time_info;
            });

            data.push(medic_times);
            return medication;
        });
    }

    //take daily
    if (takeDaily.length > 0) {
        takeDailyColumns = [
            imgColumn,{
                title: 'Medication',
                width: 400,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                className: 'transparent'
            },
            {
                title: 'Report',
                dataIndex: 'report',
                key: 'report'
            }
        ];
        takeDaily.map((medication) => {
            const { reports } = medication;
            // console.log(reports, 'reports');
            //const report = reports && reports[0] || {};
            let rows = [];
            const timesPerDay = medication.timesPerDay;
            const quantity = medication.quantity;

            for (var i = 0; i < timesPerDay; i++) {

                const report = reports && reports.find(report => report.order === i);
                // const report = (reports && reports[i]) || {};

                rows.push(
                    // <Col xs={3} key={i}>
                    <span style={{marginRight:5}} key={i}>
                        <MedicationCoin
                            medication={medication}
                            medicationPlan={medicationPlan}
                            user={user}
                            quantity={quantity}
                            report={report}
                            date={date}
                            order={i}
                        /></span>
                    // </Col>
                );
            }
            takeDailyData.push({
                key: medication.id + 'drug',
                medication: medication,
                name: <MedicationInfo user={user} date={date} medication={medication} medicationPlan={medicationPlan} />,
                report: rows
            });
            return medication;
        });
    }

    if (takeAsNeeded.length > 0) {
        takeAsNeededColumns = [
            {
                title: 'Medication',
                width: 300,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                className: 'transparent'
            },
            {
                title: 'Report',
                dataIndex: 'report',
                key: 'report'
            }
        ];
        takeAsNeeded.map((medication) => {
            const { reports } = medication;
            //const report = reports && reports[0] || {};
            let rows = [];
            const timesPerDay = medication.timesPerDay;
            const quantity = medication.quantity;

            for (var i = 0; i < timesPerDay; i++) {
                const report = (reports && reports[i]) || {};

                rows.push(
                    <span style={{marginRight:5}} key={i}>
                        <MedicationCoin
                            medication={medication}
                            medicationPlan={medicationPlan}
                            user={user}
                            quantity={quantity}
                            report={report}
                            date={date}
                            order={i}
                        />
                    </span>
                );
            }
            takeAsNeededData.push({
                key: medication.id + 'drug',
                name: <MedicationInfo user={user} date={date} info={medication} medicationPlan={medicationPlan} />,
                report: rows
            });
            return medication;
        });
    }

	 
		return <>
				{takeAtTimes.length > 0 && (
					<>
						<Divider>
							<FormattedMessage id="plan.medication.at_times" defaultMessage="Take At Times" />
						</Divider>
                        <Table columns={columns} 
                        style={{background: '#fff'}}
                        dataSource={data} /*scroll={{x: 600}}*/ pagination={false} />
					</>
				)}
				{takeDaily.length > 0 && (
					<>
						<Divider>
							<FormattedMessage id="plan.medication.daily" defaultMessage="Take Daily" />
						</Divider>
						<Table
							columns={takeDailyColumns}
							dataSource={takeDailyData}
							/*scroll={{x: 600}}*/ pagination={false}
                            showHeader={false}
                            style={{background: '#fff'}}
						/>
					</>
				)}
				{takeAsNeeded.length > 0 && (
					<>
						<Divider>
							<FormattedMessage id="plan.medication.as_needed" defaultMessage="Take As Needed" />
						</Divider>
						<Table
							columns={takeAsNeededColumns}
							dataSource={takeAsNeededData}
                            /*scroll={{x: 600}}*/ pagination={false}
                            style={{background: '#fff'}}
							showHeader={false}
						/>
					</>
				)}
                </>;
}

export default MedicationsTable;
