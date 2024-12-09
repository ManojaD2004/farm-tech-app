import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-paper";

const InputText = ({
  text,
  placeholder,
  label,
  onChangeText,
  maxDigit = "100",
  keyboardType = "default",
  disabled = false
}: {
  text: string;
  placeholder: string;
  label: string;
  onChangeText: (e: string) => void;
  maxDigit?: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
}) => {
  return (
    <TextInput
      value={text}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      mode="outlined"
      label={label}
      placeholder={placeholder}
      right={<TextInput.Affix text={maxDigit} />}
      disabled={disabled}
    />
  );
};

export default InputText;
