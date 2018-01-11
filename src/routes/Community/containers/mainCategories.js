
/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react'
import { connect } from 'react-redux'


import MyCategoriesForm from '../components/MainCategories';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORIES  = gql`
   query GET_CATEGORIES {
       getMainCategories {
         id
        name
        description
        thumb {
          original
          small
          large
          medium
          wide
        }
        
       }
}
`;

const withMutation = graphql(CATEGORIES, {
    props: ({ ownProps, data }) => {
        //console.log(data);
        if (!data.loading) {
            return {
                info: data.getMainCategories,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(MyCategoriesForm));