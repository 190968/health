import React from 'react';
import { Tooltip, Avatar as AvatarAntd } from 'antd';
import classNames from 'classnames';

import './index.less';
import Avatar from '../../../routes/User/components/Avatar';

const AvatarListPure = ({ users, children, size, ...other }) => {
  let childrenWithProps = [];
  if (users) {
    childrenWithProps = users.map(participant => {
      return <Item key={participant.id} tips={participant.firstName} avatar={<Avatar user={participant} size={size} />} />;
    });
  } else {
    childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        size,
      })
    );
  }


  return (
    <div {...other} className={'avatarList'}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};

const Item = ({ avatar, src, size, tips, onClick = () => { } }) => {
  const cls = classNames('avatarItem', {
    ['avatarItemLarge']: size === 'large',
    ['avatarItemSmall']: size === 'small',
    ['avatarItemMini']: size === 'mini',
  });

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          {avatar ? avatar : <AvatarAntd src={src} size={size} style={{ cursor: 'pointer' }} />}
        </Tooltip>
      ) : (
          avatar ? avatar : <AvatarAntd src={src} size={size} />
        )}
    </li>
  );
};

AvatarListPure.Item = Item;
export const AvatarList = AvatarListPure;
export default AvatarList;