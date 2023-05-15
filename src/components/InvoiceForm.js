"use client";

import PlayerTable from './PlayerTable';
import UserForm from './UserForm';
import { Form, Button } from 'antd';
import { FORM_MODE } from '../utils/constants';
import { useSelector, useDispatch } from "react-redux";

import {
  selectFirstName,
  selectLastName,
  selectEmail,
} from '../store/userInfoSlice';

import {
  selectPlayersData,
} from '../store/playersTableSlice';

import {
  updateFirstName,
  updateLastName,
  updateEmail,
} from '../actions/userInfo';

import {
  postForm,
} from '../actions/api';

import {
  validateTableData,
  stripTableData,
} from '../utils/validation';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function InvoiceForm(props) {
  const dispatch = useDispatch();

  const { mode } = props;

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const tableData = useSelector(selectPlayersData);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values) => {
    if (!validateTableData(tableData)) {
      alert('Please correct missing entries in invoice');
      return;
    }

    // Perform post
    dispatch( postForm( {
      firstName,
      lastName,
      email,
      data: stripTableData(tableData),
    } ));
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 24,
      offset: 0,
    },
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      fields={[
        {
          "name": ['user', 'firstName'],
          "value": firstName
        },
        {
          "name": ['user', 'lastName'],
          "value": lastName
        },
        {
          "name": ['user', 'email'],
          "value": email
        }
      ]}
      onFieldsChange={(changedField) => {
        const name = changedField[0].name;
        const value = changedField[0].value;

        if (name[0] == 'user' && name[1] == 'firstName')
          dispatch(updateFirstName(value));
        else if (name[0] == 'user' && name[1] == 'lastName')
          dispatch(updateLastName(value));
        else if (name[0] == 'user' && name[1] == 'email')
          dispatch(updateEmail(value));
      }}
    >
    <UserForm mode={mode} />
    <div style={{height:'24px'}}></div>
    <PlayerTable mode={mode} />

    { mode==FORM_MODE.EDIT &&
      <Form.Item {...buttonItemLayout} style={{textAlign: 'center'}}>
        <Button type="primary" style={{minWidth: '20vw'}} htmlType="submit">Create Invoice</Button>
      </Form.Item>
    }
    </Form>
  );

};
