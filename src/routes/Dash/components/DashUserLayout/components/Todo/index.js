import React from 'react';

import ReactPlaceholder from 'react-placeholder';



export class DashUserLayout extends React.Component {

    render () {
        const {
            plans, loading,loadMoreEntries
        } = this.props;

        if ( loading) {
            //return (<div>Loading...</div>);
            return (
                <div className='box'>
                    <div className="box__header"><h3>TODO</h3></div>
                    <div className="box__body">
                        <Row>
                            <ReactPlaceholder ready={!loading} rows={3} showLoadingAnimation  >
                                loading...
                            </ReactPlaceholder>
                        </Row>
                    </div>
                </div>
            );
        }
console.log(this.props.plans);
        return (
            <ul>
                {this.props.plans.map(plan => { return [<li key={plan.id}>{plan.title}</li>]})}
            </ul>);
    }
}

export default DashUserLayout;


