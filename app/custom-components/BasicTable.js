/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React from 'react';

import { PapperBlock /* , EmptyData */ } from 'dan-components';

import UsersTable from './UsersTable';
import ButtonSet from './ButtonSet';

// eslint-disable-next-line react/prop-types
const BasicTable = () => (
  <div>
    <PapperBlock title="Пользователи" whiteBg icon="ios-menu-outline" desc="">
      <ButtonSet />
      <UsersTable />
    </PapperBlock>
  </div>
);

export default BasicTable;
