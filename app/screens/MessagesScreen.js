import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {
  ListItem,
  ListItemAction,
  ListItemSeparator,
} from "../components/lists";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import client from "../api/client";
import colors from "../config/colors";
import dayjs from "dayjs";
import Loading from "../components/Loading";
import OptionButton from "../components/OptionButton";
import AppTextInput from "../components/AppTextInput";
import IconButton from "../components/IconButton";

const sortByQueryArray = ["desc", "asc"];
const sortByDisplayArray = ["Newest First", "Oldest First"];

const filterArray = ["all", "saved", "archived"];

function MessagesScreen(props) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("desc");
  const [search, setSearch] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);

  const [serachBarVisible, setSearchBarVisible] = useState(false);

  let endpoint =
    "api/inbox/" + filter + "/" + sortBy + search + "?page=" + pageCurrent;

  const getMessagesApi = useApi(() => client.get(endpoint));

  useEffect(() => {
    getMessages();
  }, [reload]);

  const getMessages = async () => {
    const result = await getMessagesApi.request();
    console.log(endpoint);
    if (!result.ok) return;
    const newMessages = result.data.data;
    const newMessagesArray = parseObjectToArray(newMessages);
    setMessages([...messages, ...newMessagesArray]);
  };

  const parseObjectToArray = (obj) => {
    let arr = [];
    for (let x in obj) {
      arr.push(obj[x]);
    }
    return arr;
  };

  let searchCheck;
  const handleSearch = (text) => {
    searchCheck = text;
    setTimeout(() => {
      if (searchCheck == text) {
        if (text === "") {
          setSearch(text);
        } else {
          setSearch("/" + text);
        }
        handleRefresh();
      }
    }, 500);
  };

  const displayParticipants = (item) => {
    const participant = item.participant;
    const participants = item.participants;
    let names = participants.map(
      (participant) => participant.user.account.name
    );
    let noRepeatNames = [];
    names.forEach((name) => {
      if (
        name !== participant.user.account.name &&
        !noRepeatNames.includes(name)
      ) {
        noRepeatNames.push(name);
      }
    });
    let displayString = "";
    noRepeatNames.forEach((name, index) => {
      if (index === 0) {
        displayString += name;
      } else {
        displayString += ", " + name;
      }
    });
    return displayString ? displayString : participant.user.account.name;
  };

  const unread = (item) => {
    return (
      item.participant.links_all_count -
      item.participant.links_user_count -
      item.participant.receipts_count
    );
  };

  const handleRefresh = () => {
    setMessages([]);
    setPageCurrent(1);
    setReload(!reload);
  };

  const handleLazyLoading = async () => {
    if (!getMessagesApi.loading && getMessagesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setReload(!reload);
    }
  };

  return (
    <Screen>
      {getMessagesApi.error ? (
        <View style={styles.errorMessageContainer}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the messages.
          </AppText>
          <AppButton title="Retry" onPress={handleRefresh} />
        </View>
      ) : (
        <>
          <View style={styles.optionBar}>
            <View style={styles.optionBarRow}>
              <OptionButton
                title="Sort By"
                color={null}
                icon="sort"
                initialValue="desc"
                value={sortBy}
                queryArray={sortByQueryArray}
                displayArray={sortByDisplayArray}
                setValue={setSortBy}
                handleRefresh={handleRefresh}
              />
              <OptionButton
                title="Filter"
                color={null}
                icon="filter-variant"
                initialValue="all"
                value={filter}
                queryArray={filterArray}
                displayArray={filterArray}
                setValue={setFilter}
                handleRefresh={handleRefresh}
              />
            </View>
            <AppTextInput
              icon="magnify"
              placeholder="Search"
              onChangeText={handleSearch}
            />
          </View>
          {messages.length === 0 && !getMessagesApi.loading && (
            <AppText style={styles.errorMessage}>No messages found</AppText>
          )}
          <FlatList
            data={messages}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={displayParticipants(item)}
                time={dayjs(item.last_message.created_at).format(
                  "HH:mm DD/MM/YYYY"
                )}
                subTitle={item.last_message.clean_message}
                unread={unread(item) ? unread(item).toString() : null}
                onPress={() => console.log("Message selected", item)}
                // renderLeftActions={() => (
                //   <ListItemAction
                //     onPress={() => handleDelete(item)}
                //     icon="content-save"
                //     text="Save"
                //     backgroundColor={null}
                //     color={colors.success}
                //   />
                // )}
                // renderRightActions={() => (
                //   <ListItemAction
                //     onPress={() => handleDelete(item)}
                //     icon="book-multiple"
                //     text="Archive"
                //     backgroundColor={null}
                //     color={colors.secondary}
                //   />
                // )}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLazyLoading}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <Loading
                visible={getMessagesApi.loading}
                text="Loading Messages"
              />
            }
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  errorMessageContainer: {
    paddingHorizontal: 20,
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.primary,
    paddingVertical: 20,
    textAlign: "center",
  },
  optionBar: {
    padding: 10,
  },
  optionBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MessagesScreen;
