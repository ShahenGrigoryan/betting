/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

export default class ApiService {
  _apiBase = 'http://apitest.bettingco.ru/api';

  _userUrl = `${this._apiBase}/user/`;

  createError = ({
    response: {
      data: { message },
      status
    }
  }) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };

  login = async (username, password) => {
    const path = 'login';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: {
          username,
          password
        }
      });
      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };
  getInfo = async (token) => {
    const path = 'getinfo';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'GET',
        url,
        headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  getUsers = async token => {
    const path = 'getlist';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  createUser = async (user, token) => {
    const path = 'create';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: user,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  deleteUsers = async (users, token) => {
    const path = 'delete';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: users,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  updateUser = async (user, token) => {
    const path = 'update';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: user,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  updateBlacklist = async (user, token) => {
    const path = 'updateblacklist';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: user,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  getUserGroups = async token => {
    const path = 'getgroups';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  sendMessage = async (msg, token) => {
    const path = '';
    const url = `${this._userUrl}${path}`;

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: msg,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      throw this.createError(error);
    }
  };

  addTimeOrRef = async (users, token) => {
    const path = 'update';
    const url = `${this._userUrl}${path}`;

    const promises = users.map(user =>
      axios({
        method: 'POST',
        url,
        data: user,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    const results = await Promise.allSettled(promises);
    const errors = results
      .filter(p => p.status === 'rejected')
      .map(p => p.reason);

    return errors;
  };
}
