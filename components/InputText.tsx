import React from "react";
import { TextInput } from "react-native-paper";

const InputText = ({
  text,
  placeholder,
  label,
  setText,
}: {
  text: string;
  placeholder: string;
  label: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextInput
      value={text}
      onChangeText={(e) => setText(e)}
      mode="outlined"
      label={label}
      placeholder={placeholder}
      right={<TextInput.Affix text="/100" />}
    />
  );
};

export default InputText;
