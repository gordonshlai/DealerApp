import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
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

const sortByQueryArray = ["desc", "asc"];
const sortByDisplayArray = ["Newest First", "Oldest First"];

const filterArray = ["all", "saved", "archived"];

function MessagesScreen({ navigation }) {
  const { unread, loadMessagesFlag, setLoadMessagesFlag } = useContext(
    AuthContext
  );
  const tabBarHeight = useBottomTabBarHeight();
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
    if (!result.ok) return;
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
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: colors.secondary,
          width: "150%",
          height: "40%",
          alignSelf: "center",
          borderBottomLeftRadius: 1500,
          borderBottomRightRadius: 1500,
        }}
      />
      {getMessagesApi.error ? (
        <Screen style={styles.screen}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the messages.
          </AppText>
          <AppButton title="RETRY" onPress={handleRefresh} />
        </Screen>
      ) : (
        <Screen>
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
                style={{ backgroundColor: "white", borderRadius: 10, flex: 1 }}
                onChangeText={handleSearch}
              />
              <ActivityIndicator
                animating={getMessagesApi.loading}
                color={colors.mediumGrey}
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
          <View
            style={{
              flex: 1,
              padding: 20,
              marginHorizontal: 10,
              backgroundColor: "white",
              borderRadius: 20,
              shadowColor: colors.black,
              shadowRadius: 5,
              shadowOpacity: 0.5,
              elevation: 10,
            }}
          >
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
                      backgroundColor={null}
                      color={colors.success}
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
                      backgroundColor={null}
                      color={colors.secondary}
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
            style={{
              padding: 20,
              marginTop: 30,
              marginBottom: tabBarHeight / 2,
              backgroundColor: "white",
              shadowColor: colors.black,
              shadowRadius: 5,
              shadowOpacity: 0.5,
              elevation: 10,
            }}
          >
            <AppText style={styles.contactText}>
              Contact your Account Manager directly
            </AppText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <AppButton
                backgroundColor={null}
                color={colors.success}
                title="Call Now"
                style={{ width: "47%" }}
              />
              <AppButton title="Message" style={{ width: "47%" }} />
            </View>
          </View>
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
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
    borderTopWidth: 1,
    borderColor: "white",
  },
  optionBarFirstRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contactText: {
    fontWeight: "bold",
  },
});

export default MessagesScreen;
