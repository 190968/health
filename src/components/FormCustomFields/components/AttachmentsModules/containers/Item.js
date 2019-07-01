import Item from '../components/Item';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        onDelete: props => () => {
            const {attachment, i} = props;
            props.deleteAttachment(attachment, i);
        }
    })
);
export default enhance(Item);