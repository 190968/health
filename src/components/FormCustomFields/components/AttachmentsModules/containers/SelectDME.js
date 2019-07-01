import SelectDME from '../components/SelectDME';
import {Form} from 'antd';
import { compose, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';
const createFormField = Form.createFormField;

const enhance = compose(
    Form.create(),
    withProps(() => {
        return {modalTitle: 'Select DME'}
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form} = props;
            form.validateFields((err, values) => {
                console.log(values)
                if (!err) {
                    // const {measurement, ...otherValues} = values;
                    props.addAttachment(values);
                    // props.addAttachment({...measurement, setup:otherValues});
                }
            });
        }
    }),
    withDrawer
);
export const TaskManagerAttachmentSelectDME = enhance(SelectDME);