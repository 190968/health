import React from 'react';

import ReactPlaceholder from 'react-placeholder';



export class DashUserLayout extends React.Component {

    render () {
        const {
            loading
        } = this.props;

        if ( loading) {
            //return (<div>Loading...</div>);
            return (
                <div className='box'>
                    <div className="box__header"><h3>TODO</h3></div>
                    <div className="box__body">
                        <center>
                            <div  className='my-awesome-placeholder'>
                                <ReactPlaceholder type='text'  rows={6} color='#E0E0E0'>
                                </ReactPlaceholder>
                            </div>
                        </center>
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


