
import gql from 'graphql-tag';





export const QualityMeasureInfoFragment = gql`
        fragment QualityMeasureInfo on QualityMeasure {
            id
            title
            startDate
        }
`;

export const QualityMeasureFullInfoFragment = gql`
        fragment QualityMeasureFullInfo on QualityMeasure {
            id
            title
            startDate
            rules
            completionHigh
            completionModerate
            autoMeasureDays
            getScreeningTests {
                id
                title
            }
            getFields {
                 id
                 title
                 type
            }
        }
`;