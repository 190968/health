import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GET_USER_STAGES_QUERY = gql`
    query GET_NETWORK_STAGES ($userId: UID!)  {
        network {
            id
            getStages {
              id
              type
              typeText
              title
              description
              isDefault
              color
              isTimestamp
              isDatestamp
              getChecklist {
                  id
                  title
              }
            }
        }
        patient (id: $userId) {
            id
            getStages {
                id
                startDate
                stage {
                    id
                    getChecklist {
                        id
                        title
                    }
                }
                isCurrent
            }
        }
    }
`;

export const withUserStagesQuery = graphql(
    GET_USER_STAGES_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    userId: ownProps.user.id,
                }
            }
        },
        props: ({data}) => {
            if (!data.loading) {
                return {
                    stages: data.network.getStages,
                    patientStages: data.patient.getStages,
                    refetch: data.refetch,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);