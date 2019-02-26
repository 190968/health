import Rule from '../components/Rule';
import { compose } from 'recompose';
import {Form} from 'antd';
import { withDrawer } from '../../../../Modal';


const enhance = compose(
    Form.create(),
    withDrawer
);
export const BrahmsRuleManager = enhance(Rule);