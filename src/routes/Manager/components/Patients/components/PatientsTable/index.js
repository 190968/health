import { Table, Menu, Dropdown, Icon, Progress } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import InviteButtons from '../../../../../../components/Tables/InviteButton/index';
import PatientEditButton from '../PatientEditButton';
import { PatientPasswordButton } from '../PatientPasswordButton';
import { Loading, LoadingBox } from '../../../../../../components/Loading';
import moment from 'moment';
import { TableColumnSearch, TableColumnDates } from '../../../../../../components/Tables/TableColumn';
import { AdherenceProgress } from '../../../../../../components/Network/UIElements/adherenceProgress';
import { TableWithMessage } from '../../../../../../components/Tables';

export const PatientsTable = (props) => {
	const {
		loading,
		handleTableChange,
		patients=[],
		total,
		selectedCount,
		openShowButton,
		hideShowButton,
		showButton,
		selectedObj,
		getPatientsTable
	} = props;


	const {fields=[]} = getPatientsTable || {};

	let tableColumns = fields.map((data) => {
		const { canSort, type } = data;

		let filters = {};
		switch (data.field) {
			case 'full_name':
				filters = {
					width: 200,
					filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => <TableColumnSearch onSearch={props.doSearch} />,
					filterIcon: <Icon type="search" />
				};
				break;
			case 'adherence':
			case 'med_adherence':
				filters = {
					width: 200,
					filters: [
						{
							text: 'High',
							value: 'high'
						},
						{
							text: 'Medium',
							value: 'med'
						},
						{
							text: 'Low',
							value: 'low'
						}
					]
				};
				break;
			default:
				if (type === 'date') {
					filters = {
						width: 150,
						filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
							<TableColumnDates />
						),
						filterIcon: <Icon type="calendar" />
					};
				}
				break;
		}

		let render = (title, info) => {
			switch (data.field) {
				case 'full_name':
					filters = {
						filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
							<TableColumnSearch />
						),
						filterIcon: <Icon type="search" />
					};
					const { id, fullName } = info;
					return <Link to={'/u/' + id}>{fullName}</Link>;
					break;
				case 'adherence':
				case 'med_adherence':
					//console.log(title, info);
					return <AdherenceProgress value={parseInt(title)} size="small" />;
					break;
				default:
					if (type === 'date') {
						filters = {
							filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
								<TableColumnDates />
							),
							filterIcon: <Icon type="calendar" />
						};
						return title && moment(title).format('L');
					}
					return title;
					break;
			}
		};
		console.log(filters);
		return {
			title: data.label,
			dataIndex: data.field,
			key: data.label,
			render: render,
			//sorter: canSort
			sorter: canSort
				? (a, b) => {
						//     // const {getInfoByNetworkTable:infoa} = a;
						//     // const {getInfoByNetworkTable:infob} = b;

						//     //  console.log(a);
						//     //  console.log(data.field);
						//     //  console.log(a[data.field]);
						return a[data.field] > b[data.field];
					}
				: false,
			...filters
		};
	});
	tableColumns.push({
		title: '',
		width: 50,
		render: (title, user) => {
			const menu = (
				<Menu>
					<Menu.Item key={0}>
						<PatientEditButton patient={user} asMenuItem />
					</Menu.Item>
					<Menu.Item key={1}>
						<PatientPasswordButton user={user} asMenuItem />
					</Menu.Item>
				</Menu>
			);
			return (
				<Dropdown overlay={menu} trigger={[ 'click' ]}>
					<Icon type="setting" />
				</Dropdown>
			);
		}
	});

	let dataSource = patients.map((patient) => {
		const { getInfoByNetworkTable=[], ...otherInfo } = patient;
		let newPatientData = { ...otherInfo };
		// prepare info from fields
		getInfoByNetworkTable.map((data) => {
			const { code, value } = data;

			switch (code) {
				default:
					newPatientData[code] = value;
					break;
				case 'full_name':
					newPatientData[code] = otherInfo.lastName;
					break;
				case 'adherence':
				case 'med_adherence':
					newPatientData[code] = parseInt(value);//<Progress percent={parseInt(value)} size="small" />;
					break;
			}
			return null;
		});

		return newPatientData;
	});

	console.log(tableColumns);
	console.log(dataSource);
 
	const rowSelection = {
		onChange: (record, data) => (
			console.log('rowSelection', data), record.length < 1 ? hideShowButton() : openShowButton(data)
		),
		getCheckboxProps: (record) => ({
			name: record.name
		})
	};

	 
	return (
		<>
			<TableWithMessage
				emptyMessage={'No Patients'}
				rowKey={'id'}
				rowSelection={rowSelection}
				dataSource={dataSource}
				columns={tableColumns}
				onChange={handleTableChange}
				loading={loading}
				total={total}
				// pagination={pagination}
				// ref={(input) => {
				//     this.table = input;
				// }}
			/>
			{showButton && <InviteButtons selectedCount={selectedCount} selectedObj={selectedObj} />}
		</>
	);
};

export default PatientsTable;
