import Catalog from '../components/Catalog';
import { compose, withProps } from 'recompose';
import { withModal } from '../../../../../../../components/Modal';

const enhance = compose(
    withProps(props => {
        return {
            modalWidth:800,
            modalTitle:'Select Program'
        }
    }),
    withModal
);
export const ProgramsCatalog = enhance(Catalog);