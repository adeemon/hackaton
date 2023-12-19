import * as React from 'react';
import { IUser } from '../../interfaces';


export const UserCard: React.FC<IUser> = ({
  id,
  userFirstName,
  userLastName,
  userRole,
  userEmail,
}) =>
  (
    <div className="user-card">
      <p className="user-card__info-field">
        { id }
      </p>
      <p className="user-card__info-field">
        { userFirstName }
      </p>
      <p className="user-card__info-field">
        { userLastName }
      </p>
      <p className="user-card__info-field">
        { userRole }
      </p>
      <p className="user-card__info-field">
        <a href={ `mailto:${userEmail}` }>{ userEmail }</a>
      </p>
    </div>
  );
