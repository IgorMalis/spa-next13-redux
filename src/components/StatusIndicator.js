"use client";

import { useSelector, useDispatch } from "react-redux";

import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  LoadingOutlined,
} from '@ant-design/icons';

import { Col, Row } from 'antd';

import {
  selectText,
  selectType,
  selectRedirectTime,
} from '../store/indicatorSlice';

import {
  INDICATOR,
} from '../utils/constants';

import styles from './StatusIndicator.module.css';


const StatusIndicator = () => {

  const text = useSelector(selectText);
  const type = useSelector(selectType);
  const redirectTime = useSelector(selectRedirectTime);

  return (
    <Row>
      <Col span={24}
        className={styles.indCont}>
        {
          type == INDICATOR.LOADING &&
          <LoadingOutlined
            className={styles.indcIcon} />
        }
        {
          (type == INDICATOR.SUCCESS || type == INDICATOR.REDIRECT) &&
	        <CheckCircleTwoTone
	          className={styles.indcIcon}
	          twoToneColor="#52c41a" />
        }
        {
          type == INDICATOR.WARNING &&
          <ExclamationCircleTwoTone
            className={styles.indcIcon}
            twoToneColor="#eb2f96" />
        }
        <span style={{verticalAlign: 'middle'}}>{ text }
	        { type == INDICATOR.REDIRECT &&
	          <><br />You will be redirected to your invoice in {redirectTime} seconds...</>
	        }
        </span>
      </Col>
    </Row>
  );

};

export default StatusIndicator;
