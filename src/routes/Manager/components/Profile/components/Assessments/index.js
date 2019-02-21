import React from 'react';
import { Card, Table, Button } from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import sort from '../../../../../../components/Tables/sort';
import { AvatarWithName } from '../../../../../User/components/AvatarWithName/index';
import { AssessmentViewButton } from '../../../Assessments/containers/AssessmentViewButton';
import { EmptyList } from '../../../../../../components/Loading';
import TaskAssignButton from '../../../../../../components/Tasks/components/TaskAssignButton';
import CardExtras from '../../../../../../components/Card';
import { UserAssessmentDeleteButton } from '../../../Assessments/components/Buttons/containers/Delete';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import AssessmentHistoryButton from '../../../Assessments/components/Buttons/components/History';
import { TableWithMessage } from '../../../../../../components/Tables';

export const AssessmentsTable = (props) => {
	const { user, date, assessments = [], loading = false, isSelf } = props;
	const total = assessments.length;
	const columns = [
		{
			title: 'Name',
			key: 'title',
			render: (info) => {
				return <AssessmentViewButton userAssessment={info} user={user} date={date} onHide={props.refetch} />; //<Truncate lines={1} >{info.assessment.name}</Truncate>
			},
			// sorter: (a, b) => sort(a, b, 'assessment', 'name')
		},

		{
			title: 'Started',
			dataIndex: 'startDate',
			key: 'date',
			render: (date) => {
				return date ? moment(date).format('L') : '';
			},
			// sorter: (a, b) => a.createdOn - b.createdOn
		},
		{
			title: 'Completed',
			key: 'completed',
			render: (data) => {
				const { getLatestReport } = data;
				const { isCompleted = false, completedOn } = getLatestReport || {};
				return isCompleted ? moment(completedOn).format('L') : '';
			}
		},
		{
			title: 'Progress',
			key: 'progress',
			align: 'right',
			render: (data) => {
				const { getLatestReport } = data;
				const { progress } = getLatestReport || {};
				return progress ? progress + '%' : '';
			}
		},
		
		{
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'history', content: <AssessmentHistoryButton user={user} userAssessment={info} asMenuItem />},
                    {key:'delete', content: <UserAssessmentDeleteButton user={user} userAssessment={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        },
	];
	const dataSource = assessments;
	const pageOpts = {
		//onChange: changePage,
		pageSize:10,
		total: total,
		hideOnSinglePage: true
	};
	const assignButton = !isSelf && <CardExtras.Split><TaskAssignButton asPlusIcon patient={user} mode={'simple'} refetch={props.refetch} assignObject={{type: 'assessment'}} /></CardExtras.Split>;
	const filters = [
		{ value: 'active', label: 'Active' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'archived', label: 'Archived' }
	];
 
 
    const extra = <React.Fragment>
        <CardExtras.Split>
            <CardExtras.Filters filters={filters} value={props.status} onChange={props.loadByStatus} />
		</CardExtras.Split>
		{assignButton}
	</React.Fragment>
	return (
		<Card type={'table'} loading={loading} title={'Assessments ' + (total > 0 ? ' (' + total + ')' : '')} extra={extra}>
			<TableWithMessage
				emptyMessage={'No Assessments'}
				size="middle"
				dataSource={dataSource}
				rowKey={'id'}
				columns={columns}
				pagination={pageOpts}
				loading={loading}
			/>
		</Card>
	);
};

export default AssessmentsTable;
