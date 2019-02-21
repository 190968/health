
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { QualityMeasureFullInfoFragment } from './fragments';




 

export const QUALITY_MEASURE_QUERY = gql`
    query QUALITY_MEASURE ($id: UID! ) {
        getQualityMeasure (id: $id) {
            ...QualityMeasureFullInfo
        }
    }
    ${QualityMeasureFullInfoFragment}
`;

export const QUALITY_MEASURE_WITH_REPORTS_QUERY = gql`
    query QUALITY_MEASURE_WITH_REPORT ($id: UID!, $userId: UID!) {
        getQualityMeasure (id: $id) {
            ...QualityMeasureFullInfo
            getLastUserReport(userId:$userId)  {
                id
                reportedOn
                getFieldsValues {
                    id
                    fieldId
                    value
                    reportedOn
                }
            }
        }
    }
    ${QualityMeasureFullInfoFragment}
`;
 

// 1- add queries:
export const withQualityMeasureQuery = graphql(QUALITY_MEASURE_QUERY,
    {
        options: ({qm}) => {
            return {
                variables: {
                    id: qm.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {getQualityMeasure} = data;
            return {...ownProps, loading: data.loading, qm:getQualityMeasure}
        },
    }
);

export const withQualityMeasureWithReportsQuery = graphql(QUALITY_MEASURE_WITH_REPORTS_QUERY,
    {
        options: ({qm, user}) => {
            const {id:userId} = user || {};
            return {
                variables: {
                    id: qm.id,
                    userId,
                    useReports: true
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {getQualityMeasure} = data;
            return {...ownProps, loading: data.loading, qm:getQualityMeasure}
        },
    }
);
