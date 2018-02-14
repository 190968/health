/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import ModalMakeCommitmentFor from '../components/ModalMakeCommitmentsFor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const MAKECOMMITMENT  = gql`
mutation MAKECOMMITMENT($id: UID!, $input: CommitmentInput!) {
  makeCommitment(id: $id, input: $input) {
    id
    motivators {
      id
    }
    charities
    date
    donate
    payment
    url
    description
  }
}

`;

const withMutation = graphql(MAKECOMMITMENT,
    {
        props: ({ ownProps, mutate }) => ({
            makeCommitment: upid => {
                console.log(upid);
                // return mutate({
                //     variables:{
                //         "id":"MTYyNzI",
                //         "input":{
                //             "date":"2018-12-07",
                //             "description":"My First makeCommitment",
                //             "url":"http://ya.ru",
                //             "donate":13.9,
                //             "motivators":"",
                //             "payment":10.5
                //         }
                //     }
                // }).then((data) => {
                //     const {plan} = ownProps;
                //
                // })
            },
        }),
    }
);
const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };

};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (id) => {
        ownProps.makeCommitment(id).then(({data}) => {
          console.log("-onSubmit-----------makeCommitment--------")
        })
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ModalMakeCommitmentFor));