import React from 'react';
import {Card} from 'antd';

export class Loading extends React.PureComponent {
    render() {
        return (
            <Card bordered={false} loading>loading....</Card>
        );
    }
}

export default Loading;


export const Empty = ({text}) => {
   return <div className="ant-list-empty-text">{text}</div>
}


