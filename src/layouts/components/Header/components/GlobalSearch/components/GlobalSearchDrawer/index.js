import React from 'react';
import {Link} from 'react-router-dom';
import { Radio, Divider, Input, Button, List } from 'antd';
import { DrawerFooter } from '../../../../../../../components/Modal';
import { EmptyList } from '../../../../../../../components/Loading';
import {AvatarWithName} from '../../../../../../../routes/User/components/AvatarWithName';
const Search = Input.Search;
const GlobalSearchDrawer = (props) => {
	console.log(props);
	const {loading, type, onSearch, items = [], search = '' , updateSearchType} = props;
	return (
		<React.Fragment>
			<Search
                placeholder="Search..."
				onSearch={onSearch}
				style={{ width: '100%' }}
				enterButton
				size="large"
				autoFocus
			/>

			<Divider>
				<Radio.Group defaultValue={type} buttonStyle="solid" onChange={updateSearchType}>
					<Radio.Button value="patient">Patients</Radio.Button>
					<Radio.Button value="manager">Managers</Radio.Button>
					<Radio.Button value="cm">Care Managers</Radio.Button>
					<Radio.Button value="aps">
						ActionPlans
					</Radio.Button>
				</Radio.Group>
			</Divider>

			{loading || items.length > 0 ? (
				<List
                    loading={loading}
					itemLayout="horizontal"
					dataSource={items}
					renderItem={(item) => (
						<List.Item>
							{type === 'aps' ? <Link to={'/builder/ap/'+item.id} >{item.title}</Link> : <AvatarWithName user={item} widget />}
						</List.Item>
					)}
				/>
			) : (
				<EmptyList>{search ? 'Nothing has been found' : 'Start searching'}</EmptyList>
			)}
			<DrawerFooter>
				<Button onClick={props.onHide}>Close</Button>
			</DrawerFooter>
		</React.Fragment>
	);
};

export default GlobalSearchDrawer;
