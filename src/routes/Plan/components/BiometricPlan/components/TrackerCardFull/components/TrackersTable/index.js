import React from 'react';
import { Table, List, Icon, Popover } from 'antd';
import moment from 'moment';
import TrackerInputField from '../../../../containers/TrackerInputField';
export const TrackersTable = (props) => {
	const { biometricPlan, tracker, user, date } = props;
	const { columns, canReport = false } = biometricPlan || {};
    const { columns: trackerColumns = [], measurement, timesToReport } = tracker || {};
    const { reports = []} = measurement || {}
	const trackerColumnsNum = trackerColumns.length;

	let columnsFinal = [];
	// if tracker has columns, add columns
	if (trackerColumnsNum > 0) {

		columnsFinal = columns.filter(column => trackerColumns.includes(column.id));

		// console.log(columns);
		// console.log(trackerColumns);
		columnsFinal = columnsFinal.map((column) => {
			// if (trackerColumns[column.key]) {
				return {
					title: column.name,
					dataIndex: 'col_' + column.id,
					key: column.id,
					render: (title, info) => {
						return title;
					} /*width: 150*/
				};
			// }
		});
	} else {
		columnsFinal = [
			{
				title: '',
				dataIndex: 'input',
				key: 'input',
				render: (title, info) => {
                    console.log(title);
                    console.log(info);
					return title;
				} /*width: 150*/
			}
		];
	}

	const data = [];
	const dataList = [];

	// normalize trackers
	const tracker_columns = trackerColumns;
    const defaultTrackerFields = {
		tracker,
        measurement,
        date,
		user,
		canReport
	}
	// if we have columns - put it into columns table
	if (tracker_columns.length > 0) {
		let tracker_column_info = {
			key: tracker.id,
			name: measurement.label,
			item: measurement
			//input: <TrackerField info={tracker} date={date} list_id={info.id} />
		};
		tracker_columns.map((column_id) => {
			let inputFields = [];
			for (var i = 0; i < timesToReport; i++) {
                let report = null;
                let report_arr = [];
				if (reports) {
					report_arr = reports.filter((e) => {
						return e.reportKey === i && e.columnId === column_id;
                    });
                    
                    // console.log(reports);
                    // console.log(i, column_id);
                    // console.log(report_arr);

					// if (report_arr.length > 0) {
					// 	report = end(report_arr);
					// }
                }
                let reportedNum = report_arr && report_arr.length;
                reportedNum = reportedNum > 1 ? reportedNum : 1;
                for (var ir = 0; ir < reportedNum; ir++) {
					const report = report_arr[ir] || {};
                    inputFields.push(
                        <TrackerInputField
                            {...defaultTrackerFields}
                            column={column_id}
                            report={report}
                            reportKey={i}
							updateHistory
                        />
                    );
                }

				
			}

			tracker_column_info['col_' + column_id] = (
				<List size="small" dataSource={inputFields} renderItem={(item) => <List.Item>{item}</List.Item>} />
			);
			return column_id;
		});
		
		data.push(tracker_column_info);
	} else {
        const reportsNum = reports && reports.length || 1;
        const linesNum = reportsNum > timesToReport ? reportsNum : timesToReport;
		// if not -  just to table
		let inputFields = [];
		for (var i = 0; i < linesNum; i++) {
			let report = null;
			let report_arr = [];
			if (reports) {
				report_arr = reports.filter((e) => e.reportKey === i);
				// if (report_arr.length > 0) {
				// 	report = report_arr[0];
				// }
            }
            let reportedNum = report_arr && report_arr.length;
            reportedNum = reportedNum > 1 ? reportedNum : 1;
            for (var ir = 0; ir < reportedNum; ir++) {
                const report = report_arr[ir] || {};
                const {reportedOn, reporter} = report || {};
                const {fullName} = reporter || {}
                const content = 'Reported by '+fullName+' on '+moment(reportedOn).format('LT');
                inputFields.push(
                    <React.Fragment>
                        <TrackerInputField
                        {...defaultTrackerFields}
                        report={report}
						reportKey={i}
						updateHistory
                    />
                    {reportedOn && <span style={{marginLeft:5, marginTop:5, verticalAlign: 'middle'}}><Popover content={content}>
                        <Icon type="question-circle" theme="outlined" />
                    </Popover></span>}
                    </React.Fragment>
                );
            }
			
		}
		//
		let trackerName = measurement.label;
		data.push({
			key: tracker.id,
			item: measurement,
			input: <List size="small" dataSource={inputFields} renderItem={(item) => <List.Item>{item}</List.Item>} />
		});
	}
	console.log(trackerColumns);
	console.log(columnsFinal);
	console.log(data);

	return (
		<React.Fragment>
			<Table
				size="middle"
				showHeader={trackerColumns.length > 0}
				columns={columnsFinal}
				dataSource={data}
				pagination={false}
			/>
		</React.Fragment>
	);
};

export default TrackersTable;

const TrackerTableInput = (props) => {};
