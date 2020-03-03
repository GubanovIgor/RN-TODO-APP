import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { TodoState } from "./src/context/todo/TodoState";
import { MainLayout } from "./src/MainLayout";
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    visitor1: require("./assets/fonts/visitor1.ttf")
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
