"use client";
import React, { TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...otherProps }: Props, ref) => {
    return (
      <textarea
        ref={ref}
        {...otherProps}
        className={`${styles.textarea} ${className || ""}`}
      />
    );
  }
);

export default Textarea;
