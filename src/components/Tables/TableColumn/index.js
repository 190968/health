import React from 'react';
import { Input, Icon, Tooltip, Badge } from 'antd';
import { DateField } from '../../FormCustomFields';
import { withStateHandlers, withHandlers } from 'recompose';
import moment from 'moment';
import './index.less';
import { compose } from 'react-apollo';
const TableColumnSearchPure = (props) => {
	const { search, onSearch, onClear, placeholder = 'Search' } = props;
	const suffix = search ? null/*<Tooltip title={'Reset'}><Icon type="close-circle" onClick={onClear} className={'pointer'} /></Tooltip>*/ : <Icon type="search" />;
	const allowClear = search !== '';
	return (
		<div className="custom-filter-dropdown">
			<Input
				suffix={suffix}
				//ref={(ele) => (this.searchInput = ele)}
				placeholder={placeholder}
				defaultValue={search}
				onChange={onSearch}
				onPressEnter={onSearch}
				allowClear={allowClear}
			/>
		</div>
	);
	//,
};

const enh = compose(
	withHandlers({
		onSearch: props => (value) => {
			// console.log(props);
			// console.log(value.target.value);
			if (props.onSearch) {
				props.onSearch(value.target.value);
			}
		},
		onClear: props => () => {
			if (props.onSearch) {
				props.onSearch(null);
			}
		}
	}),
	// withStateHandlers(
	// 	(props) => {
	// 		return { search: props.search };
	// 	}, () =>
	// 	{
	// 		let timer = null;
	// 		return {
	// 			onSearch: (state, props) => (e) => {
	// 				const { value } = e.target;
	// 				console.log(e);
	// 				console.log(value);
	// 				clearTimeout(timer);
	// 				timer = setTimeout(() => {
	// 					if (props.onSearch) {
	// 						props.onSearch(value);
	// 					}
	// 				}, 500);
	// 				return {search: value};
	// 			},
	// 			onClear: (state, props) => () => {
	// 				if (props.onSearch) {
	// 					props.onSearch('');
	// 				}
	// 				return {search: ''}
	// 			}
	// 		}
	// 	}
	// )
);
export const TableColumnSearch = enh(TableColumnSearchPure);

export const TableColumnDates = (props) => {
	return (
		<div className="custom-filter-dropdown">
			<DateField />
			<DateField />
		</div>
	);
};

export const getTableDateProps = ( dataIndex='createdDate', props={}) => {

	return {
		dataIndex,
		width:150,
		// align: 'right',
        render: (info) => info && moment(info).format('l'),
        filterDropdown: <TableColumnDates />,
		sorter: (a, b) => a[dataIndex] > b[dataIndex],
		...props
	}
}


export const getTableCountProps = (props={}) => {

	return {
		width:150,
		align: 'right',
        render: (count) => <Badge count={count} overflowCount={9999} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />,
        // filterDropdown: <TableColumnDates />,
		// sorter: (a, b) => a[dataIndex] > b[dataIndex],
		...props
	}
}
