import CohortsPure from '../components/Cohorts';
import {compose, withHandlers} from 'recompose';
import { withCohortsQuery } from '../components/Cohorts/queries';
import {withRouter} from 'react-router-dom';

const enhance = compose(
    withCohortsQuery,
    withRouter,
    withHandlers({
        onChange: props => ({key}) => {
            //console.log(info);
            props.history.push('/cohorts/view/'+key);
        },
        createCohort:props => () => {
            //console.log(info);
            props.history.push('/patients?show_filters=1');
        },
    })
    // withStateHandlers(props => {
    //     return {
    //         activeFilters: {}
    //     }
    // }, {
    //     updateFilters: (state, props) => (newFilter) => {
    //         const {activeFilters} = state;
    //         console.log(newFilter, 'newFilter');
    //         return {activeFilters: {...activeFilters, ...newFilter}};
    //     },
    //     resetActiveFilters: () => () => {
    //         return {
    //             activeFilters: {}
    //         }
    //     }
    // })
);
export const Cohorts = enhance(CohortsPure);
export default Cohorts;