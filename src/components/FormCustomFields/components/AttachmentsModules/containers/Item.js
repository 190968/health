import Item from '../components/Item';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        onDelete: props => () => {
            const {attachment} = props;
            props.deleteAttachment(attachment);
        }
    })
);
export default enhance(Item);