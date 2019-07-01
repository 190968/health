
import Item from '../components/Item';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        onDelete: props => () => {
            const {equipment, i} = props;
            props.deleteItem(equipment, i);
        }
    })
);
export default enhance(Item);