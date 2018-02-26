import React from 'react'
import { connect } from 'react-redux'

import TrackerField from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const reportOnTracker = gql`
    mutation trackerReport($id: ID!, $input: TrackerReportInput!) {
        trackerReport(id:$id, input: $input) {
             id
        }
    }
`;

export const getTrackerProgress = gql`
    query GET_BIOMETRIC_PLAN_PROGRESS ($userId: ID!, $date: Date)  {
            biometricPlan (userId: $userId) {
                id
                progress(date: $date)
            }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ ownProps, mutate }) => ({
        trackerReport: (input, id) => {
            return mutate({
                variables: { input: input, id: id },
                refetchQueries: [{
                    // after we reported - refetch tracker adherence
                    query: getTrackerProgress,
                    variables: {
                        userId: ownProps.userId,
                        date:ownProps.date
                    },
                }],
            })
        },
    }),
});


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (amid, report, list_id) => {
        /*if (!is_taken) {
            report = {};
        }*/
        /*let new_report = {};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }*/

        //const input = {value:value,date:date};
        ownProps.trackerReport(report, amid)
            .then(({data}) => {

                message.success('Reported');

                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});
export default withMutation(connect(mapStateToProps, mapDispatchToProps)(TrackerField));






