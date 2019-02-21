import React from 'react';
import {Popconfirm} from 'antd';

const HealthRecordDeleteButton = props => {
    const {handleDelete} = props;

    //return <span onClick={handleDelete}>Delete</span>;
    return <Popconfirm title={'Delete Health Record'} onConfirm={handleDelete} okText="Yes" cancelText="No" >
    Delete
    </Popconfirm>;
}

export default HealthRecordDeleteButton;