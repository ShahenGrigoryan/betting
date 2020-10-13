import React, { Fragment } from 'react';

import AddUserModal from './AddUserModal';
import DeleteUsersAlert from './DeleteUsersAlert';
import RefUsersAlert from './RefUsersAlert';
import MessageModal from './MessageModal';
import AddTimeModal from './AddTimeModal';

const ButtonSet = () => (
  <Fragment>
    <div>
      <AddUserModal />
      <DeleteUsersAlert />
      <RefUsersAlert />
      <MessageModal />
      <AddTimeModal />
    </div>
  </Fragment>
);

export default ButtonSet;
