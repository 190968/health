import PubMedArticlesPure from '../components/PubMedArticles';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {compose, withProps, withState} from 'recompose';
import { withDrawer } from '../../../components/Modal';

export const GET_PUB_MED_PUBLICATIONS_QUERY = gql`
    query GET_PUBMED_ARTICLES ($search: String, $lastCursor: ID) {
        health {
            getPubMedArticles(search: $search, lastCursor: $lastCursor) {
                id
                title 
                abstractText
                pubYear
            }
        }
    }
`;

const withQuery = graphql(
    GET_PUB_MED_PUBLICATIONS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                search: ownProps.search,
            }
        }),
        props: ({data}) => {
            const {health={}} = data;
            const {getPubMedArticles=[]} = health;


            return {loading: data.loading, articles: getPubMedArticles, 
                doSearch(search) {
                    console.log(search);
                    return data.refetch({
                        search
                    });
                }};
        },
    }
);

const enhance = compose(
    //withState('search', 'setSearch', props => props.search || ''),
    withQuery,
    withProps(props => {
        return {
            modalTitle: 'PubMed Articles',
            modalFooter: 'close'
        }
    }),
    withDrawer
);
export const PubMedArticles = enhance(PubMedArticlesPure);
export default PubMedArticles;
