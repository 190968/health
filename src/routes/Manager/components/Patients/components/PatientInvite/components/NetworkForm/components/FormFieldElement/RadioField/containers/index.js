import RadioField from '../components/index';
import { compose, withHandlers, withProps } from 'recompose';
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
export default enhance(RadioField);