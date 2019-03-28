import View from '../components/View';
import { withDrawer } from '../../../../../components/Modal';
import { compose, withProps } from 'recompose';

const enhance = compose(
    withProps(props => {
        const { cancer:item } = props;
        const {title} = item || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const CancerView = enhance(View);