"use client";
import React from "react";
import styles from "./styles.module.scss";

type State = {
  text: string;
  error: boolean;
};

const notificationRef = React.createRef<Notification>();

class Notification extends React.Component<object, State> {
  private timer: NodeJS.Timeout | null = null;
  constructor(props: object) {
    super(props);
    this.state = {
      text: "",
      error: false,
    };
  }

  show = (option: NotificationOption) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const { message, duration = 2000, error = false } = option;
    this.setState(
      {
        text: "",
      },
      () => {
        this.setState(
          {
            text: message,
            error,
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({ text: "" });
            }, duration);
          }
        );
      }
    );
  };

  render() {
    const { text, error } = this.state;
    if (!text) {
      return null;
    }
    return (
      <div className={`${styles.notification} ${error ? styles.error : ""}`}>
        {text}
      </div>
    );
  }
}

export { Notification, notificationRef };

type NotificationOption = {
  message: string;
  duration?: number;
  error?: boolean;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  show: (option: NotificationOption) => {
    notificationRef.current?.show(option);
  },
};
