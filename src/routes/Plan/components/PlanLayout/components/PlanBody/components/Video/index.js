import React from 'react';


const PlanBodyVideo = props => {
    console.log(props);
    const {plan} = props;
    const {getBody} = plan || {};
    const {html, text} = getBody || {};

    return <div style={{margin:'auto', width:'50%', minWidth: 200}} dangerouslySetInnerHTML={{__html: html}}></div>
}

export default PlanBodyVideo;