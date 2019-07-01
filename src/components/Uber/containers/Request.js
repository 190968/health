import UberRequestPure from '../components/Request';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../Modal';
import {Form} from 'antd';

const enhance = compose(
    withProps(props => {
        return {modalTitle: 'Request an Uber'}
    }),
    Form.create(),
    withDrawer
);
export const UberRequest = enhance(UberRequestPure);