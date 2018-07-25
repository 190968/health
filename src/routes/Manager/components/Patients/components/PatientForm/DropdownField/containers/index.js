import DropdownField from '../components/index';
import { compose, withStateHandlers, branch, withHandlers, withState, withProps } from 'recompose';
import { Form } from 'antd';
const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
        },
    }),
    withProps(props => {
        console.log("containers --> ", props);
        return { label: props.label, options: props.options }
    }),
);
export default enhance(DropdownField);