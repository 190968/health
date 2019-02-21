import View from '../components/View';
import { withDrawer } from '../../../../../components/Modal';
import { compose, withProps } from 'recompose';
import { withNetworkProviderQuery } from '../queries';

const enhance = compose(
    withNetworkProviderQuery,
    withProps(props => {
        const { networkProvider } = props;
        const { provider:item } = networkProvider || {};
        const {title} = item || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const ProviderView = enhance(View);