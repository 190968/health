import HeaderFilterPure from '../components/HeaderFilter';
import {compose, withHandlers} from 'recompose';
import { withToggleState } from '../../../../../components/Modal';
import { Form } from 'antd';

const enhance = compose(
    withToggleState,
    Form.create({
        onFieldsChange: (props, fields) => {
            console.log(props);
            console.log(fields);
        }
    }),
);
export const CohortsHeaderFilter = enhance(HeaderFilterPure);