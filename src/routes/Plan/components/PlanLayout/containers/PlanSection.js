//import React from 'react'


import PlanSection from '../components/PlanSection'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnLesson = gql`
    mutation sectionReport($id: UID!, $upid: UID! $date: Date!) {
        sectionComplete(id:$id, upid:$upid, date:$date) {
             id
             completed(date:$date, upid:$upid)
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        sectionReport: (upid, id, date) => {
            return mutate({
                variables: {upid:upid, id: id, date:date },
            });
        },

    }),
});
/*
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteMed: (med_id) => {
        // delete medication
        ownProps.medicationDelete(med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    },
    onClick: (med_id, report, is_taken, toggleCoin) => {

        let new_report = {id:report.id};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }

        ownProps.medicationReport({ report: new_report}, med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});*/

export default withMutation(PlanSection);
