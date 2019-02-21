import View from '../components/View';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../Modal';

const enhance = compose(
    withProps(props => {
        const { brahm:item } = props;
        const {title} = item || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const BrahmView = enhance(View);