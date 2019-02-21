import { Card, Icon, List, Spin, Row, Col, Button } from 'antd';
import Joyride from 'react-joyride';
import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import PlanWidget from '../../../../../Plan/components/Plan';
import { EmptyList } from '../../../../../../components/Loading';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


export const PLANSTORE_TOUR_STEPS = [
    {
        target: '.tour-planstore',
        content: 'Patients can visit the Plan Store to browse and download additional ActionPlans',
        disableBeacon: true,
        // hideFooter: true

    },
    {
        target: '.tour-planstore-all',
        content: (
            <>
                <div style={{ marginBottom: 10 }}>
                    <p>Thank you for stopping by our demo site!</p>
                    <p>This was just a high-level overview of the patient process. To Start engaging with your population, click the button below to Contact Us</p>
                </div>
                <a href="https://www.fitangohealth.com/contact" ><Button type={'primary'}>Contact Us</Button></a>
            </>
        ),
        url: '/static/demo/finish',
        // disableBeacon: true,
        hideFooter: true,
        // styles: {
        //     options: {
        //       width: 900,
        //     }
        //   }
    }
];

const PlanstoreContent = props => {
    const { loading, loadingButton, plans = [], hasMore, handleInfiniteOnLoad } = props;

    console.log(props);

    if (loading) {
        return (
            <Card loading={true} />
        )
    }
    // const pageOpts = {
    //     onChange: this.changePage,
    //     total: this.total,
    //     hideOnSinglePage: true/*, showSizeChanger:true*/
    // };
    //const hasMore = true;
    // console.log(plans);
    const limit = 1;
    const firstMajor = plans.splice(0, limit);
    const restPlans = plans.splice(limit);

    // console.log(firstMajor);
    // console.log(restPlans);
    return (

        <div>
            {props.showTour && <Joyride
                steps={PLANSTORE_TOUR_STEPS}
                continuous
                disableOverlayClose
                disableCloseOnEsc
                run
                callback={props.handleTourCallback}
                styles={
                    {
                        primaryColor: '#A5C943',
                        buttonClose: {
                            display: 'none',
                        },
                    }
                }
            // styles={ { buttonNext: { display: 'none' } } }
            />}
            {plans.length > 0 ?
                <div className={'tour-planstore'}>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        {firstMajor.map(plan => {
                            return <Col xs={24 / limit} key={plan.id}><PlanWidget info={plan} wide /></Col>
                        })}
                    </Row>

                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!loadingButton && hasMore}

                    >
                        <List
                            split={false}

                            loading={loadingButton}
                            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                            pagination={false/*pageOpts*/}
                            dataSource={restPlans}
                            renderItem={product => (
                                <List.Item key={product.id}>
                                    <PlanWidget info={product} key={product.id} />
                                </List.Item>
                            )}
                        />
                        {(loadingButton && hasMore) && <Spin indicator={antIcon} />}
                    </InfiniteScroll>
                </div> : <EmptyList>No ActionPlans Found</EmptyList>}
        </div>
    )
}

export default PlanstoreContent