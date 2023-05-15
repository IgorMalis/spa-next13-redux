"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';

import { Button, Form, Input, InputNumber } from 'antd';
import { FORM_MODE } from '../utils/constants';
import { Col, Row } from 'antd';

import styles from './UserForm.module.css';



import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectInvoiceNumber,
} from '../store/userInfoSlice';

import {
  updateFirstName,
  updateLastName,
  updateEmail,
} from '../actions/userInfo';


const UserForm = (props) => {
  const dispatch = useDispatch();

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const { mode } = props;

  return (
    <>
      { mode == FORM_MODE.VIEW &&
        <Row style={{textAlign:'center', marginBottom:'24px', fontSize:'17px'}}>
          <Col span={24}>
            Your invoce number: #{ invoiceNumber }
          </Col>
        </Row>
      }
      <Form.Item 
        style={{marginBottom:8}}
        name={['user', 'firstName']} label="First Name" rules={[{ required: true }]}>
        <Input
          className={styles.formInput}
          placeholder="Enter your first name"
          disabled={(mode==FORM_MODE.EDIT)?false:true}
          />
      </Form.Item>
      <Form.Item 
        style={{marginBottom:8}}
        name={['user', 'lastName']} label="Last Name" rules={[{ required: true }]}>
        <Input
          className={styles.formInput}
          placeholder="Enter your last name"
          disabled={(mode==FORM_MODE.EDIT)?false:true}
        />
      </Form.Item>
      <Form.Item
        style={{marginBottom:8}}
        name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
        <Input
          className={styles.formInput}
          placeholder="Enter your email"
          disabled={(mode==FORM_MODE.EDIT)?false:true}
        />
      </Form.Item>
    </>
  );
};

export default UserForm;
