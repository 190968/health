import UberProductsPure from '../components/Products';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({

    })
);
export const UberProducts = enhance(UberProductsPure);