import React from "react";
import { TextInput } from "react-native-paper";

const InputText = ({
  text,
  setText,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextInput
      value={text}
      onChangeText={(e) => setText(e)}
      mode="outlined"
      label="Name"
      placeholder="Type something"
      right={<TextInput.Affix text="/100" />}
    />
  );
};

export default InputText;
