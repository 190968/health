import React from 'react';
import {Modal, Spin, Icon, Card, Button, Drawer, message, Popconfirm } from 'antd';
import {compose, branch, renderComponent, withState, withHandlers, withStateHandlers} from  'recompose';
import './index.less';

const formItemLayoutDefault = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

export const withModal = (WrappedComponent) => {

    class ModalWrappeer extends React.Component {

        static defaultProps = {
            modalTitle: 'View',
            modalVisible:true,
            modalFooter:null,
            //destroyOnClose:true,
        }

        onOk = () => {
            this.props.onSubmit();
        }

        onCancel = (e) => {
            e.stopPropagation();
            if (this.props.onHide) {
                this.props.onHide(e);
            } else if (this.props.onCancel) {
                this.props.onCancel(e);
            } else {
                this.props.setModalVisible(false);
            }
        }
        render() {
            //console.log(this.props);
            //console.log(this.state);
            const {loadingButton = false, formItemLayout=formItemLayoutDefault} = this.props;// in case we use withLoadingButton
            const {loading=false, modalVisible=true, destroyOnClose=true, modalOKText='Save'} = this.props;
            let modalTitle = this.props.modalTitle;//type === '' ? 'Select Element' : this.props.getTypeName(type);
            // if (this.props.modalTitle) {
            //     modalTitle = ;
            // }
            //console.log(modalVisible);
            //console.log(typeof this.props.modalFooter);
            const modalOpts = {};
             if (this.props.modalFooter !== null) {
                 if (this.props.modalFooter === 'close') {
                     modalOpts.footer = <Button type="primary" onClick={this.onCancel}>Close</Button>;
                 } else if (this.props.modalFooter === false) {
                     modalOpts.footer = null
                 } else {
                     modalOpts.footer = this.props.modalFooter;
                 }
             }
             //console.log(modalOpts);
            if (this.props.modalWidth) {
                modalOpts.width = this.props.modalWidth;
            }
            if (loading) {
                modalOpts.footer = <div style={{clear:'both', height:32}}><div style={{float:'right',backgroundColor:'#cfd8dc9e', width:'30%', height:32}}></div></div>;
                modalOpts.closable = false;
                modalOpts.title = <div style={{backgroundColor:'rgba(255, 255, 255, 0.17)', width:'50%', height:22}}></div>;
            }
            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={modalVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText={modalOKText}
                    maskClosable={false}
                    confirmLoading={loadingButton}
                    destroyOnClose={destroyOnClose}
                    {...modalOpts}
                >
                    {loading ?
                        <Card bordered={false} loading />
                        :
                        <React.Fragment>
                            <WrappedComponent {...this.props} formItemLayout={formItemLayout} formTailLayout={formTailLayout} />
                        </React.Fragment>
                    }
                </Modal>);
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;



    return (ModalWrappeer);
}

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const Spinner = () =>
    //<Modal visible={true} footer={false} closable={false} width={50}>
    <center style={{lineHeight:'10em'}}><Spin indicator={antIcon} /></center>
    //</Modal>;
export const ModalSpinner = () => <Modal className={'transparent'} centered visible={true} footer={false} closable={false} width={50}><center><Spinner /></center></Modal>

const isLoading = ({ loading=false }) => loading;

export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);

export const withModalSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(ModalSpinner)
);
// const enhance = compose(
//     withSpinnerWhileLoading
// );

const showLoadingMessagePure = (text='Saving...') => {
    return message.loading(text);
}

showLoadingMessagePure.hide = (text) => {
    console.log(this);
    message.success(text);
}
export const showLoadingMessage = showLoadingMessagePure;

export const ModalBodyFooter = props => {
    return <div className="ant-modal-body-footer">{props.children}</div>
}




export const withToggleModal = compose(
    withState('showModal', 'setShowModal', props => props.showModal || false),
    withHandlers({
        toggleModal: props => (e) => {
            if (e) {
                if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
                }
            }
            props.setShowModal(!props.showModal);
            // if we hide the modal, run the callback
            if (props.showModal && props.onHide) {
                props.onHide();
            }
        }
    })
);

export const withToggleState = compose(
    withStateHandlers(props => {
        return {
            isToggled: props.isToggled || false
        }
    }, {
        toggleState: props => (e) => {
            if (e) {
                if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
                }
            }
            // // props.setShowModal();
            // // if we hide the modal, run the callback
            // if (props.showModal && props.onHide) {
            //     props.onHide();
            // }
            return {isToggled: !props.isToggled}
        }
    })
);


export const withTabsState = withState('activeTab', 'setActiveTab', ({activeTab}) => activeTab);
export const withStepsState = getSteps => WrappedComponent =>  {

    return withStateHandlers(props => {
        // 'activeStep', 'setActiveTab', ({activeTab}) => activeTab)
        let stepsKeys = getSteps(props);
        stepsKeys = stepsKeys.length > 0 ? stepsKeys : [];
        const {activeStep=stepsKeys[0]} = props;
        return {activeStep, stepsKeys}
     }, {
         setActiveStep: props => (activeStep) => {
             return {
                 activeStep
             }
         },
         goNextStep: state => () => {
            const {stepsKeys, activeStep} = state;
            //console.log(activeStep);
            let index = stepsKeys.indexOf(activeStep);
            //console.log(index);
            if (index === -1) {
                return {
                    activeStep
                }
            }
            if(index >= 0 && index < stepsKeys.length - 1) {
                index = stepsKeys[index+1];
            }
            return {
                activeStep:index
            }
         },
         goPrevStep: state => () => {
            const {stepsKeys, activeStep} = state;
            let index = stepsKeys.indexOf(activeStep);
            if (index === -1) {
                return {
                    activeStep
                }
            }
            if(index > 0 && index < stepsKeys.length - 1) {
                index = stepsKeys[index-1];
            }
            return {
                activeStep:index
            }
         }
     })(WrappedComponent);
}






export const withDrawer = (WrappedComponent) => {
    // console.log(WrappedComponent, 'WrappedComponent');
    const  DrawerWrappeer = props => {
        const {modalWidth=600, modalFooter=true, closable=true, maskClosable=false, loading=false, destroyOnClose=true, loadingButton=false, modalVisible=true, okLabel= 'Save', ...otherProps} = props;
        let {modalTitle='View', modalOkTitle='Save', formItemLayout=formItemLayoutDefault} = props;//type === '' ? 'Select Element' : this.props.getTypeName(type);
            // if (this.props.modalTitle) {
            //     modalTitle = ;
            // }
            //console.log(modalVisible);
            //console.log(typeof this.props.modalFooter);
            const modalOpts = {closable, destroyOnClose};
            // if (this.props.modalFooter !== null) {
            //      if (this.props.modalFooter === 'close') {
            //          modalOpts.footer = <Button type="primary" onClick={this.onCancel}>Close</Button>;
            //      } else if (this.props.modalFooter === false) {
            //          modalOpts.footer = null
            //      } else {
            //          modalOpts.footer = this.props.modalFooter;
            //      }
            //  }
             //console.log(modalOpts);
            if (modalWidth) {
                modalOpts.width = modalWidth;
            }
            if (loading) {
                modalOpts.closable = false;
                modalOpts.title = <div style={{backgroundColor:'rgba(255, 255, 255, 0.17)', width:'50%', height:22}}></div>;
            }
            // Wraps the input component in a container, without mutating it. Good!
            return (
                // <Modal
                //     title={modalTitle}
                //     visible={modalVisible}
                //     onOk={this.onOk}
                //     onCancel={this.onCancel}
                //     okText={modalOKText}
                //     maskClosable={false}
                //     confirmLoading={loadingButton}
                    
                //     {...modalOpts}
                // >

                <Drawer
                    title={modalTitle}
                    placement="right"
                    onClose={props.onClose}
                    maskClosable={maskClosable}
                    visible={modalVisible}
                    {...modalOpts}
                    style={{
                        // height: 'calc(100% - 55px)',
                        height: '100%',
                        overflow: 'auto',
                        paddingBottom: 53,
                      }}
                      //getContainer={false}
                    // zIndex={2000}
                    // style={{
                    //     height: 'calc(100% - 55px)',
                    //     overflow: 'auto',
                    //     paddingBottom: 53,
                    // }}
                    >
                    {loading ?
                        <Card bordered={false} loading />
                        :
                        <React.Fragment>
                            <WrappedComponent {...otherProps} formItemLayout={formItemLayout} formTailLayout={formTailLayout} />
                            {(modalFooter && props.onSubmit) && <DrawerFooter onHide={props.onClose} onDelete={props.onDelete} modalOkTitle={modalOkTitle} onSubmit={props.onSubmit} loadingButton={loadingButton} />}
                        </React.Fragment>
                    }
                </Drawer>);
    }
    const enhance = compose(
        withHandlers({
            onClose: props => (e) => {
                e.stopPropagation();
                if (props.onHide) {
                    props.onHide(e);
                }
            }
        })
    );

    return enhance(DrawerWrappeer);
}


export const DrawerFooter = props => {
    const {onSubmit, onHide, onDelete, loadingButton=false, modalOkTitle='Save'} = props;
    return <div
        className={'drawer-footer'}
    >
    {props.children}
    {onDelete && <Popconfirm title="Are you sure you want to Archive?" onConfirm={onDelete}   okText="Yes" cancelText="No">
    <Button type="danger" style={{float:'left'}}>Archive</Button>
   </Popconfirm>}
    { onSubmit && <React.Fragment>
        <Button
					style={{
						marginRight: 8
					}}
					onClick={onHide}
				>
					Cancel
				</Button>
				<Button onClick={onSubmit} type="primary" loading={loadingButton}>
					{modalOkTitle}
				</Button>
    </React.Fragment>}
</div>
}