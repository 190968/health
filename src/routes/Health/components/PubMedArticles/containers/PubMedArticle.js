import PubMedArticlePure from '../components/PubMedArticle';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {compose, withProps} from 'recompose';
import { withModal } from '../../../../../components/Modal';

export const GET_PUB_MED_PUBLICATION_QUERY = gql`
    query GET_PUB_MED_ARTICLE ($id: ID!) {
        health {
            getPubMedArticle(id: $id) {
                id
                title 
                abstractText
                pubYear
                journalTitle
                volume
            }
        }
    }
`;

const withQuery = graphql(
    GET_PUB_MED_PUBLICATION_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.article.id,
            }
        }),
        props: ({data}) => {
            const {health={}} = data;
            const {getPubMedArticle=[]} = health;


            return {loading: data.loading, article: getPubMedArticle};
        },
    }
);

const enhance = compose(
    withQuery,
    withProps(props => {
        return {
            modalTitle: props.article.title,
            modalFooter: 'close',
            modalWidth:700
        }
    }),
    withModal
);
export const PubMedArticle = enhance(PubMedArticlePure);
export default PubMedArticle;
