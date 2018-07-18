import CancerTreatmentPure from '../components/CancerTreatment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const USER_CANCER_TREATMENT_QUERY = gql`    
    query GET_USER_CANCER_TREATMENT ($user_id:UID)  {
        patient (id:$user_id) {
              id
              getCancerTreatments {
                drugs {
                  drugName
                  drugDescription
                }
                drugCombinations {
                  maxDrugs
                  combos {
                    score
                    blackbox
                    contraindications
                    drugtargets {
                      drug
                      ind
                    targets {
                        marker
                        targetSubstitution
                        method
                      }
                    }
                  }
                }
                markersGrouped {
                  type
                  typeText
                  markers {
                    name
                    description
                    actionable
                  }
                }
              }
        }
    }
`;

const withQuery = graphql(
    USER_CANCER_TREATMENT_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user.id,
            }
        }),
        props: ({data}) => {
            console.log(data);
            if (!data.loading) {
                return {
                    treatment: data.patient.getCancerTreatments,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export const CancerTreatment = withQuery(CancerTreatmentPure);
export default CancerTreatment;
