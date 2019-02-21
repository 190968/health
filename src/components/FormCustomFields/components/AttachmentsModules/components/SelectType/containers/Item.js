import Item from '../components/Item';
import { withHandlers } from 'recompose';

export const TaskManagerAttachmentTypeSelectItem = withHandlers({
    onSelect: props => () => {
        console.log(props);
        props.setType(props.type);
    }
})(Item);