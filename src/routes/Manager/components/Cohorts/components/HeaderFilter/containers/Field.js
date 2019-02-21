
import Field from '../components/Field';
import {compose, withHandlers} from 'recompose';
import { Form } from 'antd';

const enhance = withHandlers({
    onChange: props => (value) => {
        console.log(value);
        console.log(props, 'props');
        const {field} = props;
        const {key} = field || {};

        props.onChange({[key]: value});
    }
})
export const CohortHeaderFilterField = enhance(Field);
