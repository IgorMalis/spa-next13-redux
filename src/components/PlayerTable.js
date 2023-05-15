"use client";

import { Col, Row } from 'antd';
import { AutoComplete } from 'antd';
import { Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import PlayerRow from './PlayerRow';
import { FORM_MODE } from '../utils/constants';

import { calcTotal, calcSubtotal } from '../utils/calculation';

import styles from './PlayerTable.module.css';

import {
  selectPlayersData,
  setPlayer,
  setQuantity,
  setSubtotal,
  addItem,
} from '../store/playersTableSlice';

const PlayerTable = (props) => {
  const dispatch = useDispatch();
  const playersData = useSelector(selectPlayersData);
  const { mode } = props;

  const computeRowStyle = (i) => {
    return (i%2==0) ? styles.tableRowEven : styles.tableRowOdd;
  }

  const updatePlayerName = (name, index) => {
    dispatch(setPlayer({name, index}));
  };

  const updateQuantity = (quantity, index) => {
    dispatch(setQuantity({quantity, index}));
    const subtotal = isNaN(quantity) ? NaN : calcSubtotal(quantity);
    dispatch(setSubtotal({subtotal, index}));
  };

  const validateErrorQty = (index) => {
    return isNaN(playersData[index].quantity) && !(playersData[index].name.length == 0);
  };

  return (
    <>
      <Row className={styles.tableHeader}>
        <Col className={styles.tableHeaderCell} xs={0} sm={16}>Hockey Player</Col>
        <Col className={[styles.tableHeaderCellMid,styles.right]} xs={0} sm={4}>Quantity</Col>
        <Col className={[styles.tableHeaderCell,styles.right]} xs={0} sm={4}>Subtotal</Col>
      </Row>

      {
        playersData.map((player,index) => {
          return (<PlayerRow
            key={index}
            mode={mode}
            player={player.name}
            updatePlayer={(player) => updatePlayerName(player, index)}
            quantity={player.quantity}
            subtotal={player.subtotal}
            updateQuantity={(quantity) => updateQuantity(quantity, index)}
            rowStyle={ computeRowStyle(index) }
            checkErrorQty={ validateErrorQty(index) }
            playerIndex={index}
            playerNameValid={player.nameValid}
          />);
        })
      }

      { mode == FORM_MODE.EDIT &&
        <Row className={ [computeRowStyle(playersData.length),styles.rowButton] }>
          <Col span={24} className={styles.colButton}>
            <Button onClick={() => dispatch(addItem()) }
              type="secondary"
              style={{minWidth: '20vw'}}>Add another item</Button>
          </Col>
        </Row>
      }

      <Row style={{marginBottom: '24px'}}>
        <Col className={[styles.tableCellLabel, computeRowStyle(playersData.length+(mode==FORM_MODE.EDIT?1:0))]} xs={24} sm={0}>
          <span className={styles.tableCellLabelInner}>Total</span>
        </Col>
        <Col className={[styles.right, styles.cellTotal, computeRowStyle(playersData.length+(mode==FORM_MODE.EDIT?1:0))]}
          xs={{span: 0, offset: 0}} sm={{span: 4, offset: 16}}>
          Total
        </Col>
        <Col className={[styles.tableCellLast,styles.right,styles.inputWithPrefix, computeRowStyle(playersData.length+(mode==FORM_MODE.EDIT?1:0))]}
          xs={24} sm={4}>
          <Input value={calcTotal(playersData).toString()}
            prefix="$"
            disabled={true}
            style={{backgroundColor:'rgba(255,255,255,0.5)'}}
          />
        </Col>
      </Row>

    </>
  );

};

export default PlayerTable;
