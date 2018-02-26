//import React from 'react'


import PlanLesson from '../components/PlanLesson'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnLesson = gql`
    mutation lessonReport($id: UID!, $upid: UID!) {
        lessonComplete(id:$id, upid: $upid) {
             id
             completed
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        lessonReport: (upid, id) => {
            return mutate({
                variables: { upid:upid, id: id },
            })
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

export default withMutation(PlanLesson);
