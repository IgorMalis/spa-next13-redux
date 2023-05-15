"use client";

import { Modal } from 'antd';
import StatusIndicator from './StatusIndicator';
import { useSelector, useDispatch } from "react-redux";

import {
  selectModalVisible,
  selectType,
  hideModal,
} from '../store/indicatorSlice';

import {
  INDICATOR,
} from '../utils/constants';


export default function FormModal() {
  const dispatch = useDispatch();

  const modalVisible = useSelector(selectModalVisible);
  const type = useSelector(selectType);

  const handleOk = () => {
    dispatch( hideModal() );
  };

  return (
    <Modal title="Submitting Invoice..."
      open={modalVisible}
      closable={false}
      okButtonProps={{
        style: {
          display: (type == INDICATOR.WARNING?"inline-block":"none"),
        },
      }}
      onOk={() => handleOk()}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <div style={{margin: '36px 0px'}}>
        <StatusIndicator />
      </div>
    </Modal>
  );
};
