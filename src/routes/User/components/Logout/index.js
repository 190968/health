import React from 'react';
import {Spin, Icon} from 'antd';
const NormalLogoutForm = props => {
        return <div
        style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            display: 'flex',
            top: '50%',
            position: 'absolute',
            minHeight: '100vh',
            flexDirection: 'column'
        }}
    >
        <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
    </div>;
}

export default NormalLogoutForm;