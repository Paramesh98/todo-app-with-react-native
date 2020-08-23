import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./components/Header";
import TodoItem from "./components/todoItem";
import Add from "./components/addTodo";
import Sandbox from "./components/sandbox";

export default function App() {
  const [todo, setTodo] = useState([
    { text: "Buy a cofee", key: 1 },
    { text: "Buy a Tea", key: 2 },
    { text: "Buy a Cooldirnks", key: 3 },
  ]);

  const pressHandler = (id) => {
    setTodo((prevState) => {
      return prevState.filter((item) => item.key != id);
    });
  };

  const submitHandler = (val) => {
    if (val.length > 3) {
      setTodo((prevState) => {
        return [
          {
            text: val,
            key: Math.random().toString(),
          },
          ...prevState,
        ];
      });
    } else {
      Alert.alert("OOPS!", "Todos is too short", [
        {
          text: "Understood",
          onPress: () => console.log("alert closed"),
        },
      ]);
    }
  };
  return (
    // <Sandbox />

    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Add submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todo}
              renderItem={({ item }) => (
                <TodoItem pressHandler={pressHandler} item={item} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
