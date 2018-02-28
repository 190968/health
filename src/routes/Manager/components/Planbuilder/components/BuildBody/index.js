import React from 'react'

import { Card } from 'antd';




export class BuildBody extends React.Component {

    render() {
        const {info, plan, user, loading} = this.props;
        console.log(this.props);
        if (loading || !plan) {

            //return (<div>Loading...</div>);
            return (
                <Card loading>
                    aaa
                </Card>
            );
        }

        return (
                <Card>
                   info here
                </Card>
            )
    }
}



export default BuildBody
