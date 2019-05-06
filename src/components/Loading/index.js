import React from 'react';
import {Card,Modal, Spin, Icon, Empty as EmptyAntd} from 'antd';
import {withState} from 'recompose';



export const LoadingBox = props => {
    return (
        <Card bordered={false} loading>loading....</Card>
    );
}

export const LoadingPageSpinner = props => {
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


export const Loading = props => {
    return (
        <div style={{textAlign:'center', padding: '5%'}}><Spin indicator={<SpinIndicator />} /></div>
    );
}

export default Loading;


export const Empty = ({text}) => {
   return <div className="ant-list-empty-text">{text}</div>
}

export const EmptyList = (props) => {
    const {noImage} = props;
    let {children} = props;
    if (noImage) {
        return <div className="ant-list-empty-text">{children}</div>
    }
    console.log(children, 'childrenchildrenchildren');
    if (children.length > 1) {
        
        const text = children[0];
        children = children.filter((c,i) =>i>0);
        return <div className="ant-list-empty-text"><EmptyAntd description={text} /> <div style={{marginTop:10}}>{children}</div></div>;
    } else {
        return <div className="ant-list-empty-text"><EmptyAntd description={children} /></div>;
    }
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


