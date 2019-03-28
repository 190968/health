import View from '../components/View';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../../../components/Modal';

const enhance = compose(
    withProps(props => {
        const { cancerStage:item } = props;
        const {title} = item || {};
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const CancerStageView = enhance(View);