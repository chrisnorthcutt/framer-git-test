import * as React from "react";
import { useState } from "react";
import { colors } from "./variables";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as Type from "./Typography";

interface Props {
  disabled: Boolean;
  focused: Boolean;
}

const StyledField = styled(motion.div).attrs((props: Props) => {
  const { disabled, focused } = props;
  return {
    disabled: disabled,
    focused: focused,
  };
})`
  width: 300px;
  height: 70px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  margin-bottom: 1.5rem;

  > .field-label {
    position: absolute;
    margin-top: 18px;
    margin-left: 16px;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    line-height: 19px;
    origin-x: 0;
  }
  > .input {
    width: 90%;
    padding: 15px 16px;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    line-height: 19px;
    border-radius: 4px;
    border-style: solid;
    outline: none;
    background: ${props => props.disabled ? colors.grey200 : colors.white};

    &:invalid {
      border-color: "red";
    }
  }
  > .assist {
    margin-top: 0px;
    height: 16px;
    padding: 0 16px;
  }
`;

export function DateField(props: any) {
    const {
        label,
        disabled,
        defaultValue,
        assistMessage = "",
        errorMessage = "This date isn't valid"
    } = props;
  const [isFocused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [isValid, setValid] = useState(false);
  const id = Math.floor(Math.random() * 8888);

  function isValidDate(date: string) {
    return new Date(date).toString() !== 'Invalid Date';
  }
  function onChange(e: any) {
    setValue(e.target.value);
    setValid(isValidDate(e.target.value))
  }
  function onFocus() {
    setFocused(true);
  }
  function onBlur() {
    setFocused(false);
  }

  let activeColor;
  let message;
  if (isFocused) {
    activeColor = colors.primary600;
    message = assistMessage;
  } else if (!isValid && value.length > 0) {
    activeColor = colors.danger;
    message = errorMessage;
  } else {
    activeColor = colors.grey400;
    message = assistMessage;
  }

  return (
    <StyledField disabled={disabled}>
      <motion.label
        className="field-label"
        htmlFor={"renene" + id}
        style={{
          originX: 0,
        }}
        initial={{
          scale: 1,
          x: 0,
          y: 0,
          color: activeColor,
        }}
        animate={{
          scale: isFocused || value.length > 0 ? 0.65 : 1,
          x: isFocused || value.length > 0 ? 1 : 0,
          y: isFocused || value.length > 0 ? -15 : 0,
          color: activeColor,
        }}
        transition={{
          duration: 0.15,
        }}
      >
        {label}
      </motion.label>
      <motion.input
        id={"renene" + id}
        className="input"
        type="date"
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        initial={{
          borderWidth: 1,
          borderColor: activeColor,
        }}
        animate={{
          borderWidth: isFocused || (!isValid && value.length > 0) ? 1 : 1,
          borderColor: activeColor,
        }}
        transition={{
          duration: 0.15,
        }}
      />
      <Type.Caption className="assist">
        {message}
      </Type.Caption>
    </StyledField>
  );
}

DateField.defaultProps = {
  label: "Test",
  type: "text",
  disabled: false,
};
