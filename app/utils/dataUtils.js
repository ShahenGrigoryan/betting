/* eslint-disable operator-linebreak */
/* eslint-disable no-confusing-arrow */

import { trim } from 'lodash';

/* eslint-disable implicit-arrow-linebreak */
const convertExpiration = exp => Date.now() + exp;

// eslint-disable-next-line import/prefer-default-export
export const transformAdminDataForStorage = ({
  user: { userName, email },
  token,
  expiration
}) => ({
  username: userName,
  email,
  token,
  expiration: convertExpiration(expiration)
});

export const checkAdminSession = (admin,user) => {
  if (!admin && !user) return false;
  if(admin){
    if (admin.expiration && admin.expiration < Date.now()) return false;
  }
  if(user){
    if (user.expiration && user.expiration < Date.now()) return false;
  }
  return true;
};

export const convertDateToObj = timeStamp => {
  const dayDivider = 24 * 60 * 60;
  const hourDivider = 60 * 60;
  const minuteDivider = 60;

  let days = Math.floor(timeStamp / dayDivider);
  let hours = Math.floor((timeStamp - days * dayDivider) / hourDivider);
  let minutes = Math.floor(
    (timeStamp - days * dayDivider - hours * hourDivider) / minuteDivider
  );
  if (days < 0)
    days = hours = minutes = 0;

  return { days, hours, minutes };
};

export const convertDateToString = timeStamp => {
  const { days, hours, minutes } = convertDateToObj(timeStamp);
  return `${days >= 0 ? days : 0} д. ${days >= 0 ? hours : 0} ч. ${days >= 0 ? minutes : 0} м.`;
};

export const calcUserExpirationTime = (flag, expirationSleep, expirationDate) =>
  flag ? expirationSleep : expirationDate - Math.round(Date.now() / 1000);

export const addUserToSelect = (selectedArray, data) =>{
  console.log(selectedArray);
  // selectedArray.map(item => ({
  //   ...data[item.dataIndex]
  // }));
}

export const createTimestamp = (d, h, m, timeStamp = Math.round(Date.now() / 1000)) => {
  const days = !parseInt(d, 10) ? 0 : parseInt(d, 10);
  const hours = !parseInt(h, 10) ? 0 : parseInt(h, 10);
  const minutes = !parseInt(m, 10) ? 0 : parseInt(m, 10);

  return (
    timeStamp + (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) 
  );
};

export const convertBlackListUrls = urls => {
  const result = trim(urls)
    .split(',')
    .map(i => trim(i));
  return result;
};
