import View from '../components/View';
import { withDrawer } from '../../../../../components/Modal';
import { compose, withProps } from 'recompose';
import { withCampaignQuery } from '../queries';

const enhance = compose(
    withCampaignQuery,
    withProps(props => {
        const {campaign} = props;
        const {title} = campaign || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const CampaignView = enhance(View);