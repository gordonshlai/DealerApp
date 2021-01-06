import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import dayjs from "dayjs";
import * as Yup from "yup";

import client from "../api/client";
import useApi from "../hooks/useApi";

import Conversation from "../components/Conversation";
import colors from "../config/colors";
import Loading from "../components/Loading";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  IconSubmitButton,
  SubmitButton,
} from "../components/forms";
import AuthContext from "../auth/context";
import { Modal } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../components/Icon";
import { ListItem } from "../components/lists";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  text: Yup.string().label("Text Message"),
});

function MessageDetailScreen({ navigation, route }) {
  const messageId = route.params.messageId;

  const {
    unread,
    setUnread,
    loadMessagesFlag,
    setLoadMessagesFlag,
  } = useContext(AuthContext);

  const [error, setError] = useState();
  const [action, setAction] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const endpoint = "api/inbox/" + messageId;
  const getThreadsApi = useApi(() => client.get(endpoint));
  const sendThreadApi = useApi((payload) => client.post(endpoint, payload));
  const saveArchiveMessageApi = useApi((payload) =>
    client.patch("api/inbox/" + messageId, payload)
  );

  useEffect(() => {
    getThreads();
  }, [unread]);

  const getThreads = async () => {
    await getThreadsApi.request();
    const result = await client.get("api/inbox/unread");
    if (!result.ok) return setError(result.data.message);
    setUnread(result.data);
  };

  const handleSubmit = async ({ text }, { resetForm }) => {
    if (!text) return;
    const result = await sendThreadApi.request({
      reply: "<p>" + text + "</p>",
    });
    if (!result.ok) return setError(result.data.message);
    resetForm();
    getThreadsApi.request();
    setLoadMessagesFlag(!loadMessagesFlag);
  };

  const cleanMessageParser = (message) => {
    return message.slice(3, message.length - 4);
  };

  const handleAction = async () => {
    setModalVisible(false);
    const payload =
      action === "save"
        ? { save: getThreadsApi.data.participant.saved === "0" ? true : false }
        : {
            archive:
              getThreadsApi.data.participant.archived === "0" ? true : false,
          };
    const result = await saveArchiveMessageApi.request(payload);
    if (!result.ok) return setError(result.data.message);
    getThreadsApi.request();
    setLoadMessagesFlag(!loadMessagesFlag);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <AppButton
            icon="content-save"
            color={null}
            size={24}
            badge={
              getThreadsApi.data.participant &&
              getThreadsApi.data.participant.saved !== "0"
            }
            onPress={() => {
              setModalVisible(true);
              setAction("save");
            }}
          />
          <AppButton
            icon="archive"
            color={null}
            size={24}
            badge={
              getThreadsApi.data.participant &&
              getThreadsApi.data.participant.archived !== "0"
            }
            style={{ marginRight: 10 }}
            onPress={() => {
              setModalVisible(true);
              setAction("archive");
            }}
          />
        </View>
      ),
    });
  }, [navigation, getThreadsApi.data]);

  return (
    <>
      <View style={styles.screen}>
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
            data={getThreadsApi.data.links}
            keyExtractor={(thread) => thread.id.toString()}
            renderItem={({ item }) => (
              <Conversation
                subTitle={cleanMessageParser(item.message)}
                time={dayjs(item.created_at).format("HH:mm DD/MM/YYYY")}
                isYourself={
                  item.created_by.user.account.id ===
                  getThreadsApi.data.participant.user.account.id
                }
              />
            )}
            ListFooterComponent={
              <Loading
                visible={getThreadsApi.loading}
                text="Loading Messages"
              />
            }
          />
        </View>
        <View>
          <AppForm
            initialValues={{ text: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={error} />
            <View style={styles.sendMessageBar}>
              <View style={{ flex: 1 }}>
                <AppFormField
                  name="text"
                  placeholder="Type a message"
                  multiline
                  onContentSizeChange={() => setError(null)}
                />
              </View>
              <SubmitButton icon="send" size={24} style={styles.submitButton} />
            </View>
          </AppForm>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Screen style={styles.modal}>
          <View>
            <AppText style={styles.actionTitle}>
              {action === "save" && getThreadsApi.data.participant.saved === "0"
                ? "Save Message?"
                : action === "save" &&
                  getThreadsApi.data.participant.saved === "1"
                ? "Unsave Message?"
                : action === "archive" &&
                  getThreadsApi.data.participant.archived === "0"
                ? "Archive Message?"
                : "Unarchive Message?"}
            </AppText>
            <View style={styles.actionButtonsContainer}>
              <AppButton
                icon="check"
                title="Confirm"
                color={colors.success}
                onPress={handleAction}
              />
              <AppButton
                icon="cancel"
                title="Cancel"
                color={colors.secondary}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    flex: 1,
  },
  sendMessageBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  modal: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.lightGrey + "aa",
  },
  actionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default MessageDetailScreen;
