import React from 'react';
import {Slider, Input} from 'antd';
import ChoiceElement from '../../FormCustomFields/components/ChoiceElement';
import InputField from '../../FormCustomFields/components/InputField';
import { DateField } from '../../FormCustomFields';
import { DiagnosisSelect } from '../../Autosuggest/containers/DiagnosisSelect';
import moment from 'moment';
import { prepareRangeInput } from '../../FormCustomFields/prepare';

export const FilterField = props => {
    const {field, onChange, value} = props;
    const {label, type, options,} = field || {};
    let html = '';
    // console.log(props, 'field props');
    switch(type) {
        case 'checkbox':
            html = <ChoiceElement value={value} options={options} mode={'multiple'} onChange={onChange} />
            break;
        case 'range':
            html = <Slider range onChange={onChange} />
            break;
        case 'diagnosis':
            html = <DiagnosisSelect value={value} mode={'multiple'} onChange={onChange} />
        break;
        case 'date':
            html = <DateField value={value} onChange={onChange} />
            break;
        default:
            html = <InputField value={value} onChange={onChange} />
            break
    }
    return html;
}


export const cohortPatientFilters = [
    {label:'Gender', key:'gender', type: 'checkbox', options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'},]},
    {label: 'Age', key:'age', type: 'range', options: [0,99] },
    {label: 'Conditions', key:'diagnosis', type: 'diagnosis' },
    {label: 'Zip Code',  key:'zipcode', type: 'input' },
    {label: 'Marital status',  key:'maritalStatus', type: 'checkbox', options: [{label: 'Single', value: 'single'}, {label: 'Married', value: 'married'}, {label: 'Divorced', value: 'Divorced'}]},
    {label: 'Date Added',  key:'dateAdded', type: 'date' },
];

export const getCohortFilterObject = (filter) => {
    return getFilterObject({filters:cohortPatientFilters, filter })
}

export const getCohortFilterLabelValue = (filterKey, filter) => {
    let value = null;
    // const {key} = filter;
    const filter_obj = getCohortFilterObject(filterKey);
    const {label, type, options} = filter_obj || {};
    switch (type) {
        case 'checkbox':
            const selectedValues = filter || [];
            value = selectedValues.map(v => {
                // find in options
                const option = options.find(o => o.value === v);
                const {label:optionLabel} = option || {};
                return optionLabel;
            });
            value = value.join(", ");
            // const {} = filter_obj || {};
            break;
        case 'range':
            const min = filter[0] || null;
            const max = filter[1] || null;
            if (min || max) {
                if (min && max) {
                    value = min+'-'+max;
                } else if (min) {
                    value = 'more than'+min;
                } else if (max) {
                    value = 'less than '+min;
                }
                
            }
            break;
        case 'diagnosis':
            value = filter.map(d => d.code+' '+d.name);
            if (value) {
            value = value.join(", ");
            }
            // console.log(filter, 'Diagnosis');
            break;
        case 'input':
            value = filter;
            break;
        case 'date':
            value = filter && moment(filter).format('l');
        break;
    }
    return {label, value};
}

export const getFilterObject = ({filters, filter}) => {
    const f = filters.find(f=>f.key === filter);
    return f || 'undefined';
}


export const preparePatientFiltersInput = activeFilters => {
    // console.log(values);
    if (!activeFilters) {
        return null;
    }
    const filterKeys = Object.keys(activeFilters);
    const filters = {};
    filterKeys.map(k => {
        let activeFilter = activeFilters[k];
        switch(k) {
            case 'diagnosis':
                activeFilter = activeFilter.map(d => d.id);
                filters['icd10codes'] = activeFilter;
                return null;
                break;
            case 'age':
                activeFilter = prepareRangeInput(activeFilter);
                // console.log(activeFilter);
                break;
            case 'dateAdded':
                activeFilter = activeFilter && moment(activeFilter).format('YYYY-MM-DD');
            break;
        }
        filters[k] = activeFilter;
        return null;
    })
    return filters;
}

// export const getFilterName = filterKey => {
//     const filter = cohortFilters.find(filter=>filter.key === filterKey);
//     return filter.label || 'undefined';
// }

/**
  {label:'Gender', type: 'checkbox', options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'},]},
        {label: 'Age', type: 'range', options: [0,99] },
        {label: 'Conditions', type: 'diagnosis' },
        {label: 'Zip Code', type: 'input' },
        {label: 'Material status', type: 'checkbox', options: [{label: 'Single', value: 'single'}, {label: 'Married', value: 'married'}, {label: 'Divorced', value: 'Divorced'}]},
        {label: 'Date Added', type: 'date' },
 */

