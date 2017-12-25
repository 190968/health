import React from 'react'
import { connect } from 'react-redux'

import TrackerField from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnTracker = gql`
    mutation trackerReport($id: ID!, $input: TrackerInput!) {
        tracker(id:$id, input: $input) {
             id
        }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ mutate }) => ({
        trackerReport: (input, id) => {
            return mutate({
                variables: { input: input, id: id },
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
        //console.log(new_report);
        //const input = {value:value,date:date};
        ownProps.trackerReport({report:report, list_id:list_id}, amid)
            .then(({data}) => {
                //console.log(data);
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);
                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});
export default withMutation(connect(mapStateToProps, mapDispatchToProps)(TrackerField));






