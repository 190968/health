import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// add placeholders
import ReactPlaceholder from 'react-placeholder';

export const Network = (props) => (
    <div>
        {props.children}
    </div>

)


export default Network