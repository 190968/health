
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import DecisionElementFormFields, {prepareInput} from '../../../../../../DecisionElementFormFields';
import {modalHOC} from '../modal';

const enhance = compose(
    withHandlers({
        prepareInput: props => values => {
            console.log(values);
            return prepareInput(values);
        },
        handleSave: props => values => {
            console.log(props);
            console.log(values);
            props.form.validateFields((err, values) => {
                console.log(err);
                console.log(values);
                if (!err) {
                    const callback = (data) => {
                        console.log(data);
                    }
                    props.onSubmit({prepareInput, callback});
                }
            })
        }
    }),
    withProps(props => {
        console.log(props);
        return {
            details: props.details ? props.details.element.info : {},
            id: props.details ? props.details.element.id : ''
        }
    }),
    modalHOC
)
const DecisionElementFormFieldsEditor = enhance(DecisionElementFormFields)
export default DecisionElementFormFieldsEditor;