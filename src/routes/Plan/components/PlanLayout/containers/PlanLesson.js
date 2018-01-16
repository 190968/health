import React from 'react'
import { connect } from 'react-redux'

import PlanLesson from '../components/PlanLesson'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnLesson = gql`
    mutation lessonReport($id: ID!, $date: Date, $input: LessonInput!) {
        lesson(id:$id, input: $input) {
             id
             completed(date:$date)
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        lessonReport: (input, id, date) => {
            return mutate({
                variables: { input: input, date:date, id: id },
            }).then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);
                //ownProps.report.id = 0;


            }).catch((error) => {
                message.error(error.message);
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
                //console.log(data);
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
        //console.log(new_report);
        ownProps.medicationReport({ report: new_report}, med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);
                //ownProps.report.id = 0;

                toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});*/

export default withMutation(PlanLesson);



