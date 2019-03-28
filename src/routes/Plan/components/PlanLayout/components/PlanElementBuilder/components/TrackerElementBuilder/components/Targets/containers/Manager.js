import TrackerTargetManagerPure from '../components/Manager';
import {Form} from 'antd';

const enhance = compose(
    Form.crete();
)
export const TrackerTargetManager = enhance(TrackerTargetManagerPure);