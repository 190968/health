import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import PlanWidget from 'routes/Plan/components/Plan';
import { Skeleton, Avatar, List, Card, Tooltip, Dropdown, Button, Icon, Menu, Progress } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './index.less';
import { EmptyList } from '../../../../components/Loading';
import {PlanI18nEn as messages} from '../../i18n/en';
export const PlansList = (props) => {
	const { plans=[], user, currentUser, loading, list, totalCount=0 } = props;

	const isSelf = currentUser.id === user.id;
	const menu = (
		<Menu onClick={props.handleStatus}>
			<Menu.Item key="active"><FormattedMessage {...messages.showStatusActive} /></Menu.Item>
			<Menu.Item key="completed"><FormattedMessage {...messages.showStatusCompleted} /></Menu.Item>
			<Menu.Item key="elapsed"><FormattedMessage  {...messages.showStatusElapsed} /></Menu.Item>
			<Menu.Item key="archived"><FormattedMessage {...messages.showStatusArchived} /></Menu.Item>
		</Menu>
	);
	console.log(list);
	return (
		<Card
		loading={loading}
			title={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.myPlans} />}
			extra={
				<Button.Group>
					
						<Dropdown overlay={menu} placement="bottomRight">
						<Tooltip title={<FormattedMessage id="settings" defaultMessage="Settings" />}>
							<Button size={'small'} >
							<Icon type="setting" />
							</Button>
							</Tooltip>
						</Dropdown>
					
					{isSelf && (
						<Tooltip title={<FormattedMessage {...messages.addAp} />}>
							<Button size={'small'}>
								<Link to={'/planstore'}>
									<Icon type="plus" />
								</Link>
							</Button>
						</Tooltip>
					)}
				</Button.Group>
			}
		>
			{plans.length > 0 ? list ? (
				<List
					itemLayout="horizontal"
					pagination={false}
					dataSource={plans}
					size={'small'}
					//grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
					renderItem={(product, i) => {
						let description = [];
						const { startDate, endsIn } = product;
						if (startDate) {
							description.push(
								<React.Fragment key={'startDate'}>
									<Tooltip title={'Started on'}>
										<Icon type="calendar" />
									</Tooltip>{' '}
									{moment(startDate).format('L')}
								</React.Fragment>
							);
						}
						if (endsIn) {
							description.push(
								<React.Fragment key={'endsIn'}>
									<span style={{ float: 'right' }}>
										<Tooltip title={'Ends In'}>
											<Icon type="schedule" />
										</Tooltip>{' '}
										{endsIn} days
									</span>
								</React.Fragment>
							);
						}
						return (
							<List.Item>
								<Skeleton avatar title={false} loading={false} active>
									<List.Item.Meta
										avatar={<Avatar src={product.plan.thumb.medium} />}
										title={<Link to={'/plan/' + product.id}>{product.plan.title}</Link>}
										description={description}
									/>
									<div>
										<Tooltip title={product.plan.title + ' Progress'}>
											<Progress
												type="circle"
												showInfo={product.plan.progress > 0}
												percent={product.plan.progress}
												strokeWidth={7}
												width={50}
											/>
										</Tooltip>
									</div>
								</Skeleton>
							</List.Item>
							// <List.Item key={i}>
							// 	<Link to={'/plan/' + product.id}>
							// 		<Card
							// 			type={'ap'}
							// 			cover={
							// 				<img width={product.plan.title} alt="logo" src={product.plan.thumb.large} />
							// 			}
							// 		>
							// 			<Card.Meta
							// 				title={
							// 					<Tooltip title={product.plan.title}>
							// 						<Truncate lines={2}>{product.plan.title}</Truncate>
							// 					</Tooltip>
							// 				}
							// 				description={description}
							// 			/>
							// 		</Card>
							// 	</Link>
							// </List.Item>
						);
					}}
				/>
			) : (
				<List
					itemLayout="vertical"
					pagination={false}
					dataSource={plans}
					grid={{ gutter: 16, xs: 1, sm: 2, xl: 3 }}
					renderItem={(product, i) => {
						let description = [];
						const { startDate, endsIn, lastUsedDate } = product;
						if (startDate) {
							description.push(
								<React.Fragment key={'startDate'}>
									<Tooltip title={<FormattedMessage  {...messages.startedOn} />}>
									{moment(startDate).format('L')}
									</Tooltip>{' '}
									
								</React.Fragment>
							);
						}
						if (lastUsedDate) {
							description.push(
								<React.Fragment key={'lastUsedDate'}>
									<div style={{ float: 'right' }}>
									<Tooltip title={<FormattedMessage  {...messages.lastReported} />}>
									{moment(lastUsedDate).format('L')}
									</Tooltip>
									</div>
								</React.Fragment>
							);
						}
						
						if (endsIn) {
							description.push(
								<React.Fragment key={'endsIn'}>
									<span style={{ float: 'right' }}>
										<Tooltip title={<FormattedMessage  {...messages.endsIn} />}>
											<Icon type="schedule" />
										</Tooltip>{' '}
										{endsIn} days
									</span>
								</React.Fragment>
							);
						}
						return (
							<List.Item key={i}>
								<Link to={'/plan/' + product.id}>
									<Card
										type={'ap'}
										hoverable
										cover={
											<img width={product.plan.title} alt="logo" src={product.plan.thumb.large} />
										}
									>
										<div style={{ position: 'relative', padding: 5 }}>
											<div className={'title'}>
												<Tooltip title={product.plan.title}>
													<Truncate lines={2}>{product.plan.title}</Truncate>
												</Tooltip>
											</div>
											<div>
												{/* <div style={{ float: 'left', marginRight: 10 }}>
													<Avatar
														src={product.plan.thumb.large}
														shape="square"
														icon="camera"
													/>
												</div> */}
												<div className={'main1'}>
													<div className={'dosage'}>{description}</div>
													<Tooltip title={<FormattedMessage values={{title:product.plan.title }} {...messages.progress} />}>
														<Progress percent={product.progress} showInfo={product.progress > 0} />
													</Tooltip>
												</div>
											</div>
										</div>
									</Card>
								</Link>
							</List.Item>
						);
					}

					// <List.Item
					//     key={product.id}
					//     extra={<Link to={'/plan/'+product.id}><img width={150} alt="logo" src={product.plan.thumb.large} /></Link>}
					// >
					//     <List.Item.Meta
					//         title={<Link to={'/plan/'+product.id}>{product.plan.title}</Link>}
					//         description={}
					//     />

					// </List.Item>
					}
				/>
			) : (
				<EmptyList><FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.noPlans} /></EmptyList>
			)}
		</Card>
	);
};

// PlansList.propTypes = {
//   plans: PropTypes.array,
//   loading: PropTypes.bool,
//    // loadMoreEntries: PropTypes.function.isRequired,
// };

export default PlansList;
