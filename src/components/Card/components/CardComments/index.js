import React from 'react';
import {CommentsCard} from "../../../Comments/index";
import './index.less';


export const CardComments = props => {
    return <div className={'ant-card-comments'}>
    <CommentsCard {...props} /></div>
}