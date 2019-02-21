import Manager from '../components/Manager/index';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import {withModal, showLoadingMessage} from "../../../../../../../components/Modal/index";
import { withAddAdvocateMutation, withUpdateAdvocateMutation } from '../mutations';
 

const enhance = compose(
    withProps(props => {
        const {advocate} = props;
        const {id} = advocate || {};
        return {isUpdate: id && id !== ''};
    }),
    branch(props => props.isUpdate, withUpdateAdvocateMutation, withAddAdvocateMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {

            props.form.validateFields((err, values) => {
                if (!err) {
                    const {communication, ...otherValues} = values;
                    const input = otherValues;
                    const hide = showLoadingMessage();

                    if (props.isUpdate) {
                        props.updateAdvocate(input).then(({data})=> {
                            props.onHide();
                            hide();
                        });
                       
                    } else {
                        props.createAdvocate(input).then(({data})=> {
                            props.onHide();
                            hide();
                            if (props.refetch) {
                                props.refetch();
                            }
                        });
                    }
                    
                    // props.onSubmit(values).then(({data})=> {
                    //     props.onHide();
                    // });
                }
            });
        },
    }),
    withProps(props => {
        const {isUpdate=false} = props;
        return {modalTitle: isUpdate ? 'Edit Advocate' : 'Invite Advocate'}
    }),
    withModal
);

export const PatientAdvocateManager = enhance(Manager);