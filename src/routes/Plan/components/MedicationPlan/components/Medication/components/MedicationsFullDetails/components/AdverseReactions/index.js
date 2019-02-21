import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Icon, Card, Modal, Input, Select, Form, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import message from '../../../../../../i18n/en'
import messages from './i18n/en';
import DefaultI18nEn from '../../../../../../../../../../i18n/en';
const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
	{
		title: <FormattedMessage {...message.reaction} />,
		dataIndex: 'reaction',
		key: 'reaction'
	},
	{
		title: <FormattedMessage {...message.severity} />,
		dataIndex: 'severity',
		key: 'severity'
	},
	{
		title: <FormattedMessage {...message.added} />,
		dataIndex: 'createdAt',
		key: 'created',
		render: (info) => moment(info).format('L')
	}
];
export default class AdverseReactions extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showAdd: false };
		this.toggleAdd = this.toggleAdd.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	static propTypes = {
		data: PropTypes.array
	};
	static defaultProps = {
		data: []
	};

	toggleAdd() {
		this.setState({ showAdd: !this.state.showAdd });
	}

	handleCreate = () => {
		const form = this.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			//const {reaction, severity} = values;
			this.props.addReaction(values);

			// form.resetFields();
			// hide the modal
			this.setState({ showAdd: false });
		});
	};
	saveFormRef = (form) => {
		this.form = form;
	};

	render() {
		let { loading, reactions, reactionTypes } = this.props;

		reactions = reactions.map((info, i) => {
			return { ...info, key: i }; //info.key = i;
		});

		return (
			<Card
				title={<FormattedMessage {...messages.report} />}
				loading={loading}
				extra={
					<Button size="small" onClick={this.toggleAdd}>
						<Icon type="plus" />
					</Button>
				}
				type="inner"
			>
				{reactions.length > 0 ? (
					<Table dataSource={reactions} columns={columns} pagination={false} />
				) : (
					<div>
						<FormattedMessage {...messages.emptyText} />
					</div>
				)}
				{this.state.showAdd && (
					<AdverseCreateForm
						ref={this.saveFormRef}
						reactionTypes={reactionTypes}
						/*visible={this.state.visible}*/
						onCancel={this.toggleAdd}
						onCreate={this.handleCreate}
					/>
				)}
			</Card>
		);
	}
}

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 }
	}
};

const AdverseCreateForm = Form.create()((props) => {
	const { reactionTypes, onCancel, onCreate, form } = props;
	const { getFieldDecorator } = form;
	return (
		<Modal visible={true} title={<FormattedMessage {...DefaultI18nEn.addSomething} values={{title: <FormattedMessage {...message.reaction} /> }} />} okText="Add" onCancel={onCancel} onOk={onCreate}>
			<Form>
				<FormItem {...formItemLayout} label={<FormattedMessage {...message.reaction} />}>
					{getFieldDecorator('reaction', {
						rules: [ { required: true, message: 'Please input the reaction!' } ]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label={<FormattedMessage {...message.severity} />}>
					{getFieldDecorator('severity', {
						rules: [ { required: true, message: 'Please input the severity!' } ]
					})(
						<Select placeholder={<FormattedMessage {...DefaultI18nEn.select} />}>
							{reactionTypes.map((info, i) => (
								<Option key={i} value={info.name}>
									{info.description}
								</Option>
							))}
						</Select>
					)}
				</FormItem>
			</Form>
		</Modal>
	);
});
