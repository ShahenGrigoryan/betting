/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

import EditUserModal from './EditUserModal';

import { selectUser } from '../redux/users/users.actions';
import { openEditModal } from '../redux/modals/modals.actions';

const styles = () => ({
  table: {
    '& table': {
      tableLayout: 'fixed'
    }
  }
});

class UsersTable extends React.Component {
  state = {
    rowsPerPage: 25
  };

  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    return data !== nextProps.data;
  }

  render() {
    const { classes, data, select, openModal } = this.props;
    const { rowsPerPage } = this.state;
    const columns = [
      {
        name: 'userName',
        label: 'Логин',
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: 'roleName',
        label: 'Роль',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'email',
        label: 'Почта',
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: 'expirationTimeString',
        label: 'Подписка',
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: 'key',
        label: 'Ключ',
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: 'chatId',
        label: 'Чат ID',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'myReferalUnpaidBalance',
        label: 'Реф. выплата',
        options: {
          filter: false,
          sort: true
        }
      }
    ];

    const options = {
      filterType: 'dropdown',
      print: false,
      download: false,
      rowsPerPage,
      rowsPerPageOptions: [25, 50, 100],
      page: 0,
      onChangeRowsPerPage: numbers => this.setState({ rowsPerPage: numbers }),
      onRowsSelect: (...rowsSelected) => select(rowsSelected[1]),
      customToolbarSelect: () => {},
      onCellClick: (colData, { dataIndex }) => {
        const user = {
          ...data[dataIndex],
          blackListUrls: data[dataIndex].blackListUrls.join(', ')
        };
        openModal(user);
      },
      textLabels: {
        body: {
          noMatch: 'Не найдено записей',
          toolTip: 'Сортировать',
          columnHeaderTooltip: column => `Сортировать по ${column.label}`
        },
        pagination: {
          next: 'Следующая',
          previous: 'Предыдущая',
          rowsPerPage: 'Записей на странице',
          displayRows: 'из'
        },
        toolbar: {
          search: 'Поиск',
          downloadCsv: 'Загрузить CSV',
          print: 'Печать',
          viewColumns: 'Видимые колонки',
          filterTable: 'Выбрать в таблице'
        },
        filter: {
          all: 'Все',
          title: 'Фильтры',
          reset: 'Сбросить'
        },
        viewColumns: {
          title: 'Показать колонки',
          titleAria: 'Показатаь/Скрыть колонки'
        },
        selectedRows: {
          text: 'выбрано',
          delete: 'Удалить',
          deleteAria: 'Удалить выбранные строки'
        }
      }
    };

    return (
      <Fragment>
        <EditUserModal />
        <div className={classes.table}>
          <MUIDataTable data={data} columns={columns} options={options} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.get('users').users
});

const mapDispatchToProps = dispatch => ({
  select: userId => dispatch(selectUser(userId)),
  openModal: user => dispatch(openEditModal(user))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(UsersTable);
