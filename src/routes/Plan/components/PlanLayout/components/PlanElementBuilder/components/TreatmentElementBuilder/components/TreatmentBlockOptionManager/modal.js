import React from 'react';
import {Modal, Form, Input} from 'antd';
import {compose, withHandlers, withProps} from 'recompose';
import {withModal, withDrawer} from "../../../../../../../../../../components/Modal/index";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


const enhance = compose(
    withProps(props => {
        const modalTitle = props.type === '' ? 'Select Element' : props.getTypeName(props.type);
        return {
            modalTitle
        }
    }),
    withHandlers({
        onSubmit: props => () => {
            console.log(props);
            const prepareInput = props.prepareInput;
            const callback = props.onHide;
            props.onSubmit({prepareInput, callback});
        }
    }),

    withModal
);

const withTreatmentItemInstructions = (WrappedComponent) => {

    const TreatmentItemModal = props => {
        console.log(props, 'TreatmentItemModal');
        const {form, details={}} = props;
        const {notes=''} = details;
        
        return <React.Fragment>
            <Form>
            <WrappedComponent {...props} formItemLayout={formItemLayout} />
            {/* <FormItem
                {...formItemLayout}
                label="Instructions"
            >
                {form.getFieldDecorator('notes', {
                        initialValue:notes,
                    }
                )(
                    <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
            </FormItem> */}
            </Form>
        </React.Fragment>
    }

    return TreatmentItemModal;
}

export const modalHOC = compose(
    withTreatmentItemInstructions,
    enhance
);

export const withTreatmentItemModal = compose(
    withTreatmentItemInstructions,
    //enhance
    withProps(props => {
        const modalTitle = props.type === '' ? 'Select Element' : props.getTypeName(props.type);
        return {
            modalTitle
        }
    }),
    // withHandlers({
    //     onSubmit: props => () => {
    //         //console.log(props);
    //         const prepareInput = props.prepareInput;
    //         props.onSubmit({prepareInput});
    //         //props.onHide();
    //     }
    // }),
    withDrawer
);