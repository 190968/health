import PlainField from '../components/index';
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
        return { label: props.label }
    }),
);
export default enhance(PlainField);