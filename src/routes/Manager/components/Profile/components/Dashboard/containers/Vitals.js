import Vitals from '../components/Vitals';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {compose, withStateHandlers} from 'recompose';
import {ElementTrackerFragment, ElementTrackerReportFragment} from "../../../../../../Plan/components/Plan/fragments";
import { withSpinnerWhileLoading } from '../../../../../../Modal/components';
import { withUserVitalsQuery } from '../../../../../../Health/components/Vitals/queries';



const enhance = compose(
    withUserVitalsQuery,
    withSpinnerWhileLoading,
    withStateHandlers( props => {
        const {vitals=[]} = props;
        if (vitals.length > 0) {
            return {activeTab: vitals[0].id};
        }
        return {activeTab: null}
    }, {
        setActiveTab: state => (tab) => {
            return {activeTab:tab}
        }
    })
)
export default enhance(Vitals);