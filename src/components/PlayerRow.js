"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

import {
  Col,
  Row,
  AutoComplete,
  Input,
  InputNumber,
} from 'antd';

import {
  validateQuantity,
  validatePlayerField,
} from '../utils/validation';
import { FORM_MODE } from '../utils/constants';
import { store } from "../store";
import { playersApi } from "../store/playersApi";

import styles from './PlayerTable.module.css';

import {
  selectPlayers,
  selectTeams,
} from '../store/playersDataSlice';

import {
  setPlayerValid as setPlayerValidRedux,
  setPlayerInvalid,
} from '../store/playersTableSlice';

import {
  validatePlayerApi,
} from '../actions/api';

import { cacheClientEnabled } from '../utils/cache';


const PlayerRow = (props) => {
  const dispatch = useDispatch();
  const {
    rowStyle,
    player,
    quantity,
    subtotal,
    updatePlayer,
    updateQuantity,
    checkErrorQty,
    mode,
    playerIndex,
    playerNameValid,
  } = props;

  const CACHE_CLIENT = cacheClientEnabled();

  const handleQuantity = (value) => {
    //if (!validateQuantity(value)) return;

    if (!value)
      updateQuantity(NaN);
    else
      updateQuantity(parseInt(value));
  };

  const [search, setSearch] = useState('');
  const [playerValid, setPlayerValid] = useState(mode == FORM_MODE.VIEW);
  const players = useSelector(selectPlayers);

  const playersApiData = !CACHE_CLIENT ? useSelector(
      (state) =>
        state.playersApi.queries[`search("${search}")`]?.data
    ) : null;

  useEffect(() => {
    if (!CACHE_CLIENT) {
      if (playersApiData && search) {
        const opt = playersApiData.map((domain,ind) => ({
          value: domain.label,
          label: domain.label,
        }));

        setOptions(opt);
      } else {
        setOptions([]);
      }
    }
  }, [search, playersApiData]);


  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    if (value) {
      if (CACHE_CLIENT) {
        let filteredPlayers = players.filter((p) => {
          return p.label.toLowerCase().includes(value.toLowerCase());
        });
        let opt = filteredPlayers.map((domain,ind) => ({
          value: domain.label,
          label: domain.label,
        }));

        if (opt.length == 1 && opt[0].value == value)
          setOptions([]);
        else
          setOptions(opt);
      }
      else {
        dispatch(playersApi.endpoints.search.initiate(value));
      }
      
    }
    else {
      setOptions([]);
    }

    setSearch(value);
  };

  const validatePlayer = (e) => {
    updatePlayer(e);
    handleSearch(e);
  }

  const handleBlur = (e) => {
    if (!e.target.value || e.target.value.length == 0) {
      setPlayerValid(false);
      return;
    }

    if (CACHE_CLIENT) {
      // Perform validation on client-side
      const valid = validatePlayerField(e.target.value, players);
      setPlayerValid(valid);
      if (valid)
        dispatch( setPlayerValidRedux(playerIndex) );
      else
        dispatch( setPlayerInvalid(playerIndex) );
    } else {
      // Perform validation on server-side
      dispatch( validatePlayerApi(e.target.value, playerIndex) );
    }
  };

  useEffect(() => {
    if (!CACHE_CLIENT) {
      setPlayerValid(playerNameValid);
    }
  }, [playerNameValid]);

  return (
    <Row className={rowStyle}>
      <Col className={styles.tableCellLabel} xs={24} sm={0}>
        <span className={styles.tableCellLabelInner}>Hockey Player</span>
      </Col>
      <Col className={[styles.tableCellFirst]} xs={24} sm={16}>
        <AutoComplete
          style={{
            width: '100%',
          }}
          status={((!playerValid && !isNaN(quantity)) ||
            (player.length>0 && !playerValid)) ? "error":'' }
          value={player}
          onSearch={handleSearch}
          onChange={(e) => validatePlayer(e)}
          placeholder="Select player"
          options={options}
          disabled={(mode==FORM_MODE.EDIT)?false:true}
          onBlur={handleBlur}
        />
      </Col>

      <Col className={styles.tableCellLabel} xs={24} sm={0}>
        <span className={styles.tableCellLabelInner}>Quantity</span>
      </Col>
      <Col className={[styles.tableCell,styles.right,styles.input]} xs={24} sm={4}>
        <InputNumber status={checkErrorQty ? 'error':''}
          precision={0}
          placeholder="Enter qty"
          value={isNaN(quantity) ? '' : quantity.toString()}
          onChange={(e) => handleQuantity(e) }
          style={{
            backgroundColor:'rgba(255,255,255,0.5)',
            borderWidth: (checkErrorQty ? 3 : 1),
            width: '100%',
          }}
          disabled={(mode==FORM_MODE.EDIT)?false:true}
          />
      </Col>

      <Col className={styles.tableCellLabel} xs={24} sm={0}>
        <span className={styles.tableCellLabelInner}>Subtotal</span>
      </Col>
      <Col className={[styles.tableCellLast,styles.right,styles.inputWithPrefix]} xs={24} sm={4}>
        <Input
          placeholder="Enter qty"
          value={isNaN(subtotal) ? '' : subtotal}
          prefix="$"
          disabled={true}
          style={{backgroundColor:'rgba(255,255,255,0.5)'}}
        />
      </Col>
      <Col className={styles.tableCellLabel} xs={24} sm={0}>
        <span className={styles.tableCellSpace}>&nbsp;</span>
      </Col>
    </Row>
  );
};

export default PlayerRow;
