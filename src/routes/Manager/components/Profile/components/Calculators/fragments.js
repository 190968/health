import gql from 'graphql-tag';

export const EvidencioCalculatorFragment = gql`
       fragment EvidencioCalculatorInfo on EvidencioCalculator {
            id
            title
            description
            author
            variables {
                id
                title
                description
                type
                options {
                    value
                    label
                    min
                    max
                    unit
                    step
                }
            }
        }
`;

export const EvidencioCalculatorReportFragment = gql`
       fragment EvidencioCalculatorReportInfo on EvidencioCalculatorReport {
            id
            title
            author
            variables {
                id
                value
            }
            min
            max
            CIPercentage
            additionalresulttxt
            mintxt
            maxtxt 
            LCItxt
            HCItxt
            result
            conditionalResultText
        }
`;