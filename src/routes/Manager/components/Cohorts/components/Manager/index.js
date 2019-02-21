import React from 'react';
import {Form, Input, Divider} from 'antd';
import PeopleSelect from '../../../../../../components/Autosuggest/containers/PeopleSelect';
import { getCohortFilterLabelValue } from '../../../../../../components/Tables/FilterFields';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const CohortManager = props => {
    console.log(props);
    const {cohort, form, formItemLayout=formItemLayoutDefault, activeFilters={}, loading, managers=[], patients=[]} = props;
    const {getFieldDecorator} = form;
    const {title, description, ages, gender, codes=[]} = cohort || {};
    let details = [];
    if (cohort) {

        if (!loading) {
            const {min:minAge, max:maxAge} = ages || {};
            const filters = [
                {key:'gender', content:gender},
                {key:'age', content:[minAge, maxAge]},
                {key:'diagnosis', content:codes.map(({id, code, name}) => {
                    return {id, name:code+name};
                })}
            ];
            filters.map(filter => {
                const {key, content} = filter;
                let {label, value} = getCohortFilterLabelValue(key, content);
                details.push([label, value]);
                return;
            })
        
        }
    } else {
        // console.log(activeFilters, 'activeFilters');
        // console.log();
        const filterKeys = Object.keys(activeFilters);
        // console.log(keys);

        
        filterKeys.map(filterKey => {
            const activeFilter = activeFilters[filterKey];
            const {label, value} = getCohortFilterLabelValue(filterKey, activeFilter);
            // console.log(activeFilter, 'activeFilter');
            // console.log(cohortFilter, 'cohortFilter');
            details.push([label, value]);
            return null;//<div key={filterKey}>{label}: {value}</div>
        });
    }

    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Cohort name",
                }],
            })(
                <Input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Description"
        >
            {getFieldDecorator('description', {
                initialValue: description,
                // rules: [{
                //     required: true,
                //     message: "Please enter Chemotherapy name",
                // }],
            })(
                <TextArea  autosize={{ minRows: 1 }} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Manager"
        >
            {getFieldDecorator('managers', {
                initialValue: managers.map(manager => manager.user),
                rules: [{
                    required: true,
                    message: "Please Select Manager",
                }],
            })(
                <PeopleSelect mode={'multiple'} />
            )}
        </FormItem>

        <Divider>Cohort Details</Divider>
        {details.length > 0 && <DescriptionList formItemLayout={formItemLayout} details={details} col={1} />}
        {patients.length > 0 &&  <FormItem
            {...formItemLayout}
            label="Patients"
        >
        {patients.map(patient => {
            return <div key={patient.id} className={'ant-form-text'}><AvatarWithName user={patient} /></div>;
        })}
        </FormItem>}
    </Form>
}

export default CohortManager;