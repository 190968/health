import ViewPure from '../components/View';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../components/Modal';

const enhance = compose(
    withProps(props => {
        const {healthRecord} = props;
        const {title} = healthRecord || {};
        return {modalTitle: title}
    }),
    withDrawer
);
export const HealthView = enhance(ViewPure);
export const HealthViewNoModal = ViewPure;