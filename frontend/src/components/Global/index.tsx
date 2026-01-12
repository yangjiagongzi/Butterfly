"use client";
import React from "react";
import { Modal, modalRef } from "../Modal";
import { Notification, notificationRef } from "../Notification";
import styles from "./styles.module.scss";

const Global: React.FC = () => {
  return (
    <>
      <Modal ref={modalRef} />
      <div className={styles.globalTop}></div>
      <div className={styles.globalBottom}>
        <Notification ref={notificationRef} />
      </div>
    </>
  );
};

export default Global;
