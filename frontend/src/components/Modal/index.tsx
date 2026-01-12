"use client";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

type State = {
  children: ReactNode;
};

const modalRef = React.createRef<Modal>();

class Modal extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      children: null,
    };
  }

  show = (children: ReactNode) => {
    this.setState({
      children,
    });
  };

  close = () => {
    this.setState({
      children: null,
    });
  };

  render() {
    const { children } = this.state;
    if (!children) {
      return null;
    }
    return (
      <div className={`${styles.modal}`} onClick={() => this.close()}>
        <div
          className={`${styles.modalContainer}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
}

export { Modal, modalRef };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  show: (children: ReactNode) => {
    modalRef.current?.show(children);
  },
  close: () => {
    modalRef.current?.close();
  },
};
