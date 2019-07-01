import React from 'react';
import { Radio, Form } from 'antd';
import PeopleSelect from '../../../../../../../../components/Autosuggest/containers/PeopleSelect';
import ProviderSelect from '../../../../../../../../components/Autosuggest/containers/ProviderSelect';
import { TeamSelect } from '../../../../../../../../components/Autosuggest/containers/TeamSelect';
import messages from '../../i18n/en';
import { FormattedMessage } from 'react-intl';
import PatientSelect from '../../../../../../../../components/Autosuggest/containers/PatientSelect';
import PatientFamilyMemberSelect from '../../../../../../../../components/Autosuggest/containers/PatientFamilyMemberSelect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TaskAssign = props => {
    const { value, type, updateType, includePatient=false,updateParticipants, updateTeam, updateProvider, patient, currentNetwork, form } = props;
    const { getFieldDecorator, getFieldsError } = form;
    const disableSelect = typeof value !== 'undefined';//  !== undefined;
    //const {currentRole} = currentUser;
    const { isProviderLevel = false } = currentNetwork || {};

    const errors = getFieldsError() || {};
    console.log(errors);
    const providerError = errors.providerId || [];
    const staffMembersError = errors.staffMembers || [];
    const familyMembersError = errors.familyMembers || [];
    const teamMemberError = errors.teamMemberMode || [];
    
    //console.log(props);

    let options = [];

    if (includePatient) {
        options.push({ value: 4, label: <FormattedMessage {...messages.patient} /> });
    }
    if (patient) {
        options.push({ value: 1, label: <FormattedMessage {...messages.teamMembers} /> });
        options.push({ value: 2, label: <FormattedMessage {...messages.familyMembers} /> });
    }
    options.push({ value: 0, label: <FormattedMessage {...messages.staffMember} /> });
    if (!isProviderLevel) {
        options.push({ value: 3, label: <FormattedMessage {...messages.provider} /> });
    }

    return <React.Fragment>
        {!disableSelect && <RadioGroup onChange={updateType} value={type}>
            {options.map(option => <RadioButton key={option.value} value={option.value}>{option.label}</RadioButton>)}
        </RadioGroup>}
        {type >= 0 && <div style={{ marginTop: 5 }}>
            {(patient && type === 1) && <FormItem
                validateStatus={teamMemberError.length ? 'error' : ''}
                help={teamMemberError}
            >
                {getFieldDecorator('teamMembersMode', {
                    rules: [{
                        required: true,
                        message: <FormattedMessage {...messages.errParticipants} />
                    }],

                })(<TeamSelect user={patient} form={form} />)}</FormItem>}

            {type === 0 && <FormItem
                validateStatus={staffMembersError.length ? 'error' : ''}
                help={staffMembersError}
            >
                {getFieldDecorator('staffMembers', {
                    rules: [{
                        required: true,
                        message: <FormattedMessage {...messages.errParticipants} />
                    }],

                })(<PeopleSelect mode={'multiple'} idOnly  />)}</FormItem>}

            {type === 2 && <FormItem
                validateStatus={familyMembersError.length ? 'error' : ''}
                help={familyMembersError}
            >
                {getFieldDecorator('familyMembers', {
                    rules: [{
                        required: true,
                        message: <FormattedMessage {...messages.errParticipants} />
                    }],

                })(<PatientFamilyMemberSelect mode={'multiple'} idOnly  />)}</FormItem>}


            {type === 3 && <FormItem
                validateStatus={providerError.length ? 'error' : ''}
                help={providerError}
            >
                {getFieldDecorator('providerId', {
                    rules: [{
                        required: true,
                        message: <FormattedMessage {...messages.errProvider} />
                    }],

                })(<ProviderSelect getFullInfo={false}  />)}
            </FormItem>}

             {type === 4 && <FormItem
                validateStatus={providerError.length ? 'error' : ''}
                help={providerError}
            >
                {getFieldDecorator('patient', {
                    rules: [{
                        required: true,
                        message: <FormattedMessage {...messages.errProvider} />
                    }],

                })(<PatientSelect   />)}
            </FormItem>}
        </div>}
    </React.Fragment>;
}

export default TaskAssign;




export const validateTaskAssign = (rule, value, callback) => {
    const { message, required = true } = rule
    //console.log(rule);
    if (!required) {
        callback();
    }
    if (!value) {
        callback(message);
    }
    const newValue = value || {};
    const { type, error, participants = [], useAll = false, providerId } = newValue;

    if (error) {
        callback(error);
    }
    if (type === 1) {
        // if it's team members
        if (!useAll && participants.length === 0) {
            callback(messages.participants || 'Wrong participants');
        }
    } else if (type === 2) {
        if (participants.length === 0) {
            callback(messages.participants || 'Wrong participants');
        }
    } else if (type === 3) {
        if (!providerId) {
            // callback(messages.provider || 'Wrong Provider');
        }
    }
    // const { getFieldValue } = this.props.form
    // if (value && value !== getFieldValue('newPassword')) {
    //     callback('两次输入不一致！')
    // }

    callback()
}