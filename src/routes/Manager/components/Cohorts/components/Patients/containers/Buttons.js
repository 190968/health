import Buttons from '../components/Buttons';
import { compose, withProps } from 'recompose';

const enhance = compose(
    withProps(props => {
        const {selectedRowKeys=[], dataSource=[]} = props;
        const population = dataSource.filter((data, i) => selectedRowKeys.includes(data.id));
        return {population}
    })
);
export const CohortPatientsButtons = enhance(Buttons);