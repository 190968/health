import gql from 'graphql-tag';

export const HealthElementFragment  = gql`
    fragment HealthElement on HealthRecord {
        id
        type
        title
        isActive
        typeText
        riskLevel
        isPrimary
        details {
            ... on Diagnosis {
              id
              code {
                id
                code
                name
              }
              date
              status
              notes
              __typename
            }
        }
        }
    
`;


