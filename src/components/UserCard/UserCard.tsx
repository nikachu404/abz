import React from 'react';
import { User } from '../../types/User';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';
import './UserCard.scss';

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  const { photo, name, position, email, phone } = user;

  return (
    <div className="user-card">
      <img src={photo} alt={name} className="user-card__photo" />

      <div
        className="user-card__name truncate"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={name}>
        {name}
      </div>

      <div className="user-card__description">
        <div
          className="user-card__position truncate"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={position}>
          {position}
        </div>

        <div
          className="user-card__email truncate"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={email}>
          {email}
        </div>

        <div
          className="user-card__phone truncate"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={phone}>
          {phone}
        </div>
      </div>

      <Tooltip id="my-tooltip" noArrow={true} place="bottom" />
    </div>
  );
};
