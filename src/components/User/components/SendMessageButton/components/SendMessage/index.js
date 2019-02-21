import React from 'react';
import {Form,Select, Input, Switch, Checkbox} from 'antd';
import PatientSelect from '../../../../../Autosuggest/containers/PatientSelect';
import PeopleSelect from '../../../../../Autosuggest/containers/PeopleSelect';
import AvatarWithName from '../../../../../../routes/User/components/AvatarWithName';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout= {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

const SendMessage = (props) => {
	const { form, selectedObj, user, isUserRole, currentUser } = props;
	const { getFieldDecorator, getFieldValue } = form;
	let {selectedPeople=[]} = props;
	console.log(props, 'aaaaaa444');
	const isNotPatient = !isUserRole('patient');

	const withPerson = typeof user !== 'undefined';
	if (user) {
		selectedPeople.push(user);
	}
	// console.log(isNotPatient, 'isNotPatient');
	// console.log(isUserRole('patient'), 'isPatient');
	if (isNotPatient) {

	 
	// if (selectedObj[0].fullName) {
	// 	defVal = selectedObj.map((obj) => obj.fullName);
	// 	options = selectedObj.map((obj) => (
	// 		<Option key={obj.fullName} value={obj.fullName}>
	// 			{obj.fullName}
	// 		</Option>
	// 	));
	// } else {
	// 	defVal = selectedObj.map((obj) => obj.user.fullName);
	// 	options = selectedObj.map((obj) => (
	// 		<Option key={obj.user.fullName} value={obj.user.fullName}>
	// 			{obj.user.fullName}
	// 		</Option>
	// 	));
	// }
	console.log(withPerson);
	return (
		<Form>
			<FormItem {...formItemLayout} label="To" style={{marginBottom:0}}>
            {getFieldDecorator('recipients', {
				initialValue: selectedPeople || undefined,
				rules: [{ required: true, message:"Select Recipient"  }],
			})(
                <PeopleSelect mode="multiple" />
            )}
			</FormItem>
            <FormItem {...formTailLayout}>
            {getFieldDecorator('isAroundPatient', {
				initialValue: withPerson,
				valuePropName: 'checked'
			})(
                <Checkbox>This message is around the patient</Checkbox>
            )}
			</FormItem>
            {getFieldValue('isAroundPatient') && <FormItem {...formItemLayout} label="Patient">
                {getFieldDecorator('patient', {
					initialValue: user || undefined,
					rules: [{ required: true, message:"Select Patient" }],
				})(
                    <PatientSelect />
                )}
			</FormItem>
            }
            <FormItem {...formItemLayout} label="Subject">
				{getFieldDecorator('subject', {
					rules: [{ required: true, message:"Enter Subject" , whitespace: true }],
				})(<Input />)}
			</FormItem>
			<FormItem {...formItemLayout} label="Message">
				{getFieldDecorator('message', {
					rules: [{ required: true, message:"Enter message" , whitespace: true }],
				})(
                    <TextArea placeholder="Write your message here" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
			</FormItem>
            <FormItem {...formItemLayout} label="Urgent">
				{getFieldDecorator('isUrgent', {})(
                    <Checkbox>This is an Urgent Message</Checkbox>
                )}
			</FormItem>
		</Form>
	);
				} else {
					const userPatients = withPerson ? user : currentUser;
					//console.log(selectedPeople.map(user=>user.id));
					return (
						<Form>
							{withPerson ? <FormItem {...formItemLayout} label="To">
							{getFieldDecorator('recipients', {
								 initialValue: selectedPeople || undefined,
							})(
								<div className="ant-form-text"><AvatarWithName user={user} useLink={false} truncate /></div>
							)}
							</FormItem> : <FormItem {...formItemLayout} label="To">
							{getFieldDecorator('recipients', {
								 initialValue: selectedPeople || undefined,
								 rules: [{ required: true, message:"Select Recipient"  }],
							})(
								<PeopleSelect mode="multiple" user={userPatients} allowClear={!withPerson} disabled={withPerson} />
							)}
							</FormItem>}
							<FormItem {...formItemLayout} label="Subject">
								{getFieldDecorator('subject', {
									rules: [{ required: true, message:"Enter Subject" , whitespace: true }],
								})(<Input />)}
							</FormItem>
							<FormItem {...formItemLayout} label="Message">
								{getFieldDecorator('message', {
									rules: [{ required: true, message:"Enter Message" , whitespace: true }],
								})(
									<TextArea placeholder="Write your message here" autosize={{ minRows: 2, maxRows: 6 }} />
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="Urgent">
								{getFieldDecorator('isUrgent', {})(
									<Checkbox>This is an Urgent Message</Checkbox>
								)}
							</FormItem>
						</Form>
					);
				}
};

export default SendMessage;
