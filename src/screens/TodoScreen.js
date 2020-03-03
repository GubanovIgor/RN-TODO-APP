import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { AppLogo } from "../components/ui/AppLogo";

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  saveHandler = title => {
    onSave(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        modalVisible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
        id={todo.id}
      />

      <AppCard style={styles.appCard}>
        <AppText>{todo.title}</AppText>
        <AppButton onPress={() => setModal(!modal)}>
          <AppLogo name="edit" />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GRAY_COLOR} onPress={goBack}>
            <AppLogo name="back" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => onRemove(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <AppLogo name="delete" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    width: "40%"
  },
  appCard: {
    padding: 15,
    marginBottom: 20
  }
});
