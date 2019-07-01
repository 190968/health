import React from 'react';
import { List, Card } from 'antd';
import { withApollo } from 'react-apollo';

import '../../../../style.css';
import './index.less';
import CategoryCard from '../CategoryCard';
import { Carousel } from '../../../../../../components/UI/Carousel';
import { ListWithMessage } from '../../../../../../components/UI/List';

const MyCategories = (props) => {
	const { info, loading, asList=false, label='My Categories' } = props;
	if (loading) {
		return (
			<Card loading title={label}>
				Loading
			</Card>
		);
	}

	if (asList) {
		return <Card title={label + ' (' + info.length + ')'} type="static">
		 		<ListWithMessage
				 	// emptyMessage={''}
		 			// split={false}
		 			loading={loading}
		 			// grid={{ gutter: 10, xs: 1, sm: 2, lg: 6 }}
		 			dataSource={info}
		 			renderItem={(item) => {
						return <List.Item key={item.category.id}>
						<CategoryCard item={item.category} asLink />
					</List.Item>;
					 }}
		 		/>
		 	</Card>
	}
	// return (
	// 	
	// );
	const limit = 4;
	const slidesToShow = info.length >= limit ? limit : info.length;

	// const items = info.map((item) => <div style={{padding:5}}><CategoryCard key={item.category.id} item={item.category} /></div>);
	const items = info.map((item) => <div key={item.category.id} ><div style={{padding:5}}><CategoryCard item={item.category} /></div></div>);
	return (
		<Card  title={label + ' (' + info.length + ')'}>
			<Carousel items={items} slidesToShow={slidesToShow} />
		</Card>
	);
};

export default withApollo(MyCategories);
