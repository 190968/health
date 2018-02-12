/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Points from '../components/Points';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CURRENTLEVEL  = gql`
query GET_CURRENTLEVEL{
account{
  user{
  id
    motivation{
currentLevel{
  points
  info {
    id
  }
  nextLevel{
  title
    amount
  }
}
  }
}
}
}
`;

const withMutation = graphql(CURRENTLEVEL, {
    props: ({ ownProps, data }) => {
        console.log(data);
        if (!data.loading) {
            return {
                info: data.account.user.motivation,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Points));