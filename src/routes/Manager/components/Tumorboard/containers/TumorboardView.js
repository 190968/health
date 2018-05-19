import TumorboardView from '../components/TumorboardView';
import {compose, branch, withProps, withHandlers, withStateHandlers} from 'recompose';
import {withModal, withSpinnerWhileLoading} from "../../../../../components/Modal/index";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "./TumorboardManager";

export const GET_TUMORBARD_QUERY = gql`    
    query GET_TUMORBOARD ($id: UID!) {
        getTumorboard (id:$id) {
            ...TumorboardInfo
            getNewCommentsNumber
        }
    }
    ${TumorboardFragment}
`;

// 1- add queries:
const withQuery = graphql(
    GET_TUMORBARD_QUERY,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
                //skip: !ownProps.tumorboard.id,
                variables: {
                    id: ownProps.tumorboard.id,
                },
            }

        },
        props: ({ ownProps, data }) => {
            let {loading, tumorboard={}} = data;
            if (!loading) {
                tumorboard = data.getTumorboard;
            }
            return {...ownProps, loading, tumorboard};
        },
    }
);

const modalEnhance = compose(
    withProps(props => {
        return {modalTitle: 'View Tumorboard', modalFooter:'close'}
    }),
    withModal
);
const enhance = compose(
    withQuery,
    withSpinnerWhileLoading,
    branch(props => props.asModal, modalEnhance)
)
export default enhance(TumorboardView);