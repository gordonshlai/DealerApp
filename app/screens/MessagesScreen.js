import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import client from "../api/client";

const initialMessages = [
  {
    id: 1,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 2,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 3,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 4,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 5,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 6,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 7,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../assets/logo-2.png"),
  },
  {
    id: 8,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/logo-2.png"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const messageApi = useApi(() => client.get("api/inbox/all/desc"));

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const result = await messageApi.request();
    console.log(result.data);
  };

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            // image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages(initialMessages);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MessagesScreen;
