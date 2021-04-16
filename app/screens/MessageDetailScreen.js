import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";
import * as Yup from "yup";

import client from "../api/client";
import useApi from "../hooks/useApi";

import Conversation from "../components/Conversation";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
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
import AppText from "../components/AppText";
import Background from "../components/Background";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";

const validationSchema = Yup.object().shape({
  text: Yup.string().label("Text Message"),
});

function MessageDetailScreen({ navigation, route }) {
  const messageId = route.params.messageId;

  const tabBarHeight = useBottomTabBarHeight();
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
  const sendMessageApi = useApi((payload) => client.post(endpoint, payload));
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
    if (!text || sendMessageApi.loading) return;
    const result = await sendMessageApi.request({
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

  return (
    <>
      <Background />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: colors.secondary,
        }}
      >
        <AppButton
          icon="content-save-outline"
          backgroundColor={null}
          color={colors.primary}
          border={false}
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
          backgroundColor={null}
          color={colors.danger}
          border={false}
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
      <Screen
        style={[
          styles.screen,
          {
            paddingBottom:
              Platform.OS === "android" ? tabBarHeight : (tabBarHeight * 2) / 3,
          },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          keyboardVerticalOffset={Platform.OS == "ios" ? 150 : 0}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              inverted
              data={getThreadsApi.data.links}
              keyExtractor={(thread) => thread.id.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingBottom: index === 0 ? 20 : 0,
                  }}
                >
                  <Conversation
                    subTitle={cleanMessageParser(item.message)}
                    time={dayjs(item.created_at).format("HH:mm - DD/MM/YYYY")}
                    isYourself={
                      item.created_by.user.account.id ===
                      getThreadsApi.data.participant.user.account.id
                    }
                  />
                </View>
              )}
              ListFooterComponent={
                <Loading
                  visible={getThreadsApi.loading}
                  text="Loading Messages"
                />
              }
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
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
                    placeholder="Write message here"
                    multiline
                    editable={!sendMessageApi.loading}
                    style={[
                      styles.textInput,
                      sendMessageApi.loading && {
                        opacity: 0.5,
                      },
                    ]}
                    onContentSizeChange={() => setError(null)}
                  />
                </View>
                <SubmitButton
                  icon="send"
                  size={30}
                  style={styles.submitButton}
                />
              </View>
            </AppForm>
          </View>
        </KeyboardAvoidingView>
      </Screen>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
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
              title="Cancel"
              backgroundColor={null}
              color={colors.success}
              onPress={() => setModalVisible(false)}
              style={{ width: "45%" }}
            />
            <AppButton
              title="Confirm"
              onPress={handleAction}
              style={{ width: "45%" }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    ...defaultStyles.shadow,
  },
  sendMessageBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 50,
    ...defaultStyles.shadow,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    marginLeft: 5,
    borderRadius: 50,
    ...defaultStyles.shadow,
  },
  modal: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.lightGrey + "aa",
    flex: 1,
  },
  actionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MessageDetailScreen;
