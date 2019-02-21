import React from 'react';
import {Tag} from 'antd';

export const STATUSES_LIST = [
        // {label: 'All', value:'all'},
        {label: 'Active', value:'active', color: 'magenta'},
        {label: 'Published', value:'published', color: 'blue'},
        {label: 'Executed', value:'executed', color: 'green'},
        {label: 'Finished', value:'finished', color: 'green'},
        {label: 'Completed', value:'completed', color: 'green'},
        {label: 'Archived', value:'archived', color: 'grey'},
        {label: 'Pending', value:'pending', color: 'cyan'},
        {label: 'Future', value:'future', color: 'geekblue'},
        {label: 'Scheduled', value:'scheduled', color: 'geekblue'},
        {label: 'Draft', value:'draft', color: 'darkgrey'},
        
        {label: 'In Progress', value:'in_progress'},
    ];

export const formatStatus = (status) => {
    const obj = STATUSES_LIST.find(s => s.value === status);
    const {label} = obj || {};
    return label;
}

const getStatus = (status) => {
    const obj = STATUSES_LIST.find(s => s.value === status);
    return obj;
}

export const StatusTag = ({status}) => {
    const obj = getStatus(status);
    const {label, color} = obj || {};
    return <Tag color={color}>{label}</Tag>;
}