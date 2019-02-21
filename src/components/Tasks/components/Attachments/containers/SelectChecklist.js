import SelectAp from '../components/SelectAp';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    withProps(props => {
        return {modalTitle: 'Select Checklist'}
    }),
    withDrawer,
    withHandlers({
        onChange: props => (value) => {
            props.addAttachment(value);
        }
    })
);
export const TaskManagerAttachmentSelectChecklist = enhance(SelectAp);