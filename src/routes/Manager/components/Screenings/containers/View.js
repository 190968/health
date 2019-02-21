import View from '../components/View';
import { withDrawer } from '../../../../../components/Modal';
import { compose, withProps } from 'recompose';
import { withScreeningQuery } from '../queries';

const enhance = compose(
    withScreeningQuery,
    withProps(props => {
        const {screening} = props;
        const {title} = screening || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const ScreeningView = enhance(View);