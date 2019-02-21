import React from 'react';
import {Card,Modal, Spin, Icon, Empty as EmptyAntd} from 'antd';
import {withState} from 'recompose';



export const LoadingBox = props => {
    return (
        <Card bordered={false} loading>loading....</Card>
    );
}

export const Loading = props => {
    return (
        <div style={{textAlign:'center', padding: '5%'}}><Spin indicator={<SpinIndicator />} /></div>
    );
}

export default Loading;


export const Empty = ({text}) => {
   return <div className="ant-list-empty-text">{text}</div>
}

export const EmptyList = ({children, noImage}) => {
    if (noImage) {
        return <div className="ant-list-empty-text">{children}</div>
    }
    return <div className="ant-list-empty-text"><EmptyAntd description={children} /></div>;
    
}


export const SpinIndicator = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const LoadingModal = () => {
    return <Modal
        visible={true}
        closable={false}
        destroyOnClose
        footer={false}
        bodyStyle={{height: 160, textAlign: 'center', lineHeight: 8}}
    >
        <Spin indicator={<SpinIndicator />} />
    </Modal>
}

export const withLoadingButton = withState('loadingButton', 'setLoadingButton', false);
export const withLoadingState = withState('loadingState', 'setLoadingState', false);


