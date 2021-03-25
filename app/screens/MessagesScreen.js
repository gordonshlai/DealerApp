import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  // ActivityIndicator,
  Dimensions,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
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
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import useDidMountEffect from "../hooks/useDidMountEffect";
import ButtonGroup from "../components/ButtonGroup";
import Background from "../components/Background";
import { AppErrorMessage } from "../components/forms";
import defaultStyles from "../config/styles";
import ActivityIndicator from "../components/ActivityIndicator";

const sortByQueryArray = ["desc", "asc"];
const sortByDisplayArray = ["Newest First", "Oldest First"];

const filterArray = ["all", "saved", "archived"];

function MessagesScreen({ navigation }) {
  const { unread, loadMessagesFlag, setLoadMessagesFlag } = useContext(
    AuthContext
  );
  const tabBarHeight = useBottomTabBarHeight();
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [concat, setConcat] = useState(false);
  const [replace, setReplace] = useState(false);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("desc");
  const [search, setSearch] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);

  let endpoint =
    "api/inbox/" + filter + "/" + sortBy + search + "?page=" + pageCurrent;

  const getMessagesApi = useApi(() => client.get(endpoint));
  const saveArchiveMessageApi = useApi((messageId, payload) =>
    client.patch("api/inbox/" + messageId, payload)
  );

  useEffect(() => {
    replaceMessages();
  }, [replace]);

  useDidMountEffect(() => {
    concatMessages();
  }, [concat]);

  useDidMountEffect(() => {
    handleRefresh();
  }, [unread, loadMessagesFlag]);

  const getMessages = async () => {
    const result = await getMessagesApi.request();
    console.log(endpoint);
    if (!result.ok) return setError(result.data.message);
    const newMessages = result.data.data;
    const newMessagesArray = parseObjectToArray(newMessages);
    return newMessagesArray;
  };

  const concatMessages = async () => {
    const newMessagesArray = await getMessages();
    setMessages([...messages, ...newMessagesArray]);
  };

  const replaceMessages = async () => {
    const newMessagesArray = await getMessages();
    setMessages([...newMessagesArray]);
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
      (participant) => participant.user && participant.user.account.name
    );
    let noRepeatNames = [];
    names.forEach((name) => {
      if (
        name !== participant.user.account.name &&
        !noRepeatNames.includes(name) &&
        name !== null
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

  const unreadCount = (item) => {
    return (
      item.participant.links_all_count -
      item.participant.links_user_count -
      item.participant.receipts_count
    );
  };

  const handleRefresh = () => {
    setPageCurrent(1);
    setReplace(!replace);
  };

  const handleLazyLoading = async () => {
    if (!getMessagesApi.loading && getMessagesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setConcat(!concat);
    }
  };

  const handleAction = async (message, action) => {
    const payload =
      action === "save"
        ? { save: message.participant.saved === "0" ? true : false }
        : {
            archive: message.participant.archived === "0" ? true : false,
          };
    const result = await saveArchiveMessageApi.request(message.id, payload);
    if (!result.ok) return setError(result.data.message);
    setLoadMessagesFlag(!loadMessagesFlag);
  };

  return (
    <Screen>
      <Background />
      {getMessagesApi.error ? (
        <>
          <ActivityIndicator visible={getMessagesApi.loading} />
          <View style={styles.errorContainer}>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve the messages.
            </AppText>
            <AppErrorMessage error={error} visible={error} />
            <AppButton title="RETRY" onPress={handleRefresh} />
          </View>
        </>
      ) : (
        <>
          <ButtonGroup
            buttons={filterArray.map((item) => item.toUpperCase())}
            selectedIndex={filterArray.indexOf(filter)}
            onPress={(index) => {
              setFilter(filterArray[index]);
              handleRefresh();
            }}
          />
          <View style={styles.optionBar}>
            <View style={styles.optionBarFirstRow}>
              <AppTextInput
                icon="magnify"
                placeholder="Search"
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  flex: 1,
                  marginRight: 10,
                }}
                onChangeText={handleSearch}
              />
              <OptionButton
                title="Sort"
                backgroundColor={null}
                color={colors.primary}
                border={false}
                icon="sort-variant"
                initialValue="desc"
                value={sortBy}
                size={16}
                queryArray={sortByQueryArray}
                displayArray={sortByDisplayArray}
                setValue={setSortBy}
                handleRefresh={handleRefresh}
              />
            </View>
          </View>
          <View style={styles.messagesContainer}>
            <ActivityIndicator
              visible={saveArchiveMessageApi.loading || getMessagesApi.loading}
            />
            {messages.length === 0 && !getMessagesApi.loading && (
              <AppText style={styles.errorMessage}>No messages found</AppText>
            )}
            <FlatList
              data={messages}
              keyExtractor={(message, index) => message.id.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={displayParticipants(item)}
                  saved={item.participant.saved === "1"}
                  archived={item.participant.archived === "1"}
                  time={dayjs(item.last_message.created_at).format(
                    "HH:mm - DD/MM/YYYY"
                  )}
                  subTitle={item.last_message.clean_message}
                  unread={
                    unreadCount(item) ? unreadCount(item).toString() : null
                  }
                  onPress={() =>
                    navigation.navigate(routes.MESSAGE_DETAIL, {
                      messageId: item.id,
                      title: displayParticipants(item),
                    })
                  }
                  renderLeftActions={() => (
                    <ListItemAction
                      onPress={() => handleAction(item, "save")}
                      icon="content-save"
                      text={item.participant.saved === "0" ? "Save" : "Unsave"}
                      backgroundColor={colors.lightGrey}
                      color={colors.primary}
                    />
                  )}
                  renderRightActions={() => (
                    <ListItemAction
                      onPress={() => handleAction(item, "archive")}
                      icon="archive"
                      text={
                        item.participant.archived === "0"
                          ? "Archive"
                          : "Unarchive"
                      }
                      backgroundColor={colors.lightGrey}
                      color={colors.danger}
                    />
                  )}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={handleLazyLoading}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<Loading visible={getMessagesApi.loading} />}
            />
          </View>
          <View
            style={[styles.contactContainer, { marginBottom: tabBarHeight }]}
          >
            <AppText style={styles.contactText}>
              Contact your Account Manager directly
            </AppText>
            <AppButton title="Message" />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
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
    borderTopWidth: 1,
    borderColor: "white",
  },
  optionBarFirstRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  messagesContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    ...defaultStyles.shadow,
  },
  contactContainer: {
    padding: 20,
    marginTop: 30,
    backgroundColor: "white",
    ...defaultStyles.shadow,
  },
  contactText: {
    fontWeight: "bold",
  },
});

export default MessagesScreen;
