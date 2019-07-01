
import gql from 'graphql-tag';

export const FootnoteFragment = gql`
    fragment Footnote on Footnote {
        id
        text
        color
    }
`;