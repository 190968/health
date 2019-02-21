import QualMeasures from '../components/QualMeasures';
import {compose, branch, renderComponent} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_QUAL_MEASURES($user_id:UID) {
  patient(id: $user_id) {
     id
     getQualityMeasures {
         edges {
            id
            qualityMeasure {
                id
                title
            }
            date
        }
     }
  }
}
`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient, refetch} = data;
        const {getQualityMeasures} = patient || {};
        const {edges=[], totalCount} = getQualityMeasures || {};

        return {loading: data.loading, items:edges, total:totalCount, refetch }
    },
});



const enhance = compose(
    withQuery,
    withSpinnerWhileLoading,
    //branch(props => props.noCard, renderComponent(UserQualityMeasuresTablePure))
);

export const UserQualityMeasures = enhance(QualMeasures);
export default UserQualityMeasures;