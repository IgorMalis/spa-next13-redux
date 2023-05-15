"use client";

import Image from 'next/image';
import { Col, Row } from 'antd';

import styles from './Header.module.css';


export default function Header() {

  return (
    <Row>
      <Col span={24}
        className={styles.headerCol}>
        <Image
          src="/logo.png"
          width={300}
          height={93}
          alt="Card Trader"
          priority
          />
      </Col>
    </Row>
  );

};
