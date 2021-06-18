import React, { memo, useContext, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import Background from "../../components/Background";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import Quote from "./components/Quote";
import OptionButton from "../../components/OptionButton";
import { AppErrorMessage } from "../../components/forms";
import AppTextInput from "../../components/AppTextInput";
import Loading from "../../components/Loading";
import WarrantyContext from "../../warranty/context";

import useApi from "../../hooks/useApi";
import client from "../../api/client";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

const sortByArray = ["newest", "oldest"];

function SavedQuotesScreen({ navigation }) {
  const { setUser, setQuote } = useContext(WarrantyContext);

  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [serachBarVisible, setSearchBarVisible] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState("newest");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [deletedVisible, setDeletedVisible] = useState(false);

  let endpoint = `api/car/warranty/quote?page=${pageCurrent}&sort=${sort}&search=${search}`;
  const getSavedQuotesApi = useApi(() => client.get(endpoint));

  const userApi = useApi(() => client.get("api/user"));
  const getQuoteApi = useApi((token) =>
    client.get(`api/car/warranty/quote/${token}`)
  );

  const deleteQuoteApi = useApi((id) =>
    client.delete(`api/car/warranty/quote/${id}`)
  );
  useEffect(() => {
    getQuotes();
  }, [reload]);

  const getQuotes = async () => {
    const result = await getSavedQuotesApi.request();
    if (!result.ok) return setError(result.data.message);
    const newSavedQuotes = result.data.data;
    setSavedQuotes([...savedQuotes, ...newSavedQuotes]);
  };

  const handleRefresh = () => {
    setSavedQuotes([]);
    setPageCurrent(1);
    setError("");
    setReload(!reload);
  };

  let searchCheck;
  const handleSearch = (text) => {
    searchCheck = text;
    setTimeout(() => {
      if (searchCheck == text) {
        setSearch(text);
        handleRefresh();
      }
    }, 500);
  };

  const handleOpenQuotePress = async (item) => {
    const quote = await getQuoteApi.request(item.token);
    if (!quote.ok) return setError(quote.data.message);

    const user = await userApi.request();
    if (!user.ok) return setError(user.data.message);

    setUser(user.data.user);
    setQuote(quote.data);
    navigation.navigate(routes.CAR_WARRANTY_CUSTOMISE_COVER);
  };

  const handleDeleteQuotePress = async (id) => {
    const quote = await deleteQuoteApi.request(id);
    if (!quote.ok) return setError(quote.data.message);
    handleRefresh();
    setDeletedVisible(true);
    setTimeout(() => {
      setDeletedVisible(false);
    }, 3000);
  };

  const handleLazyLoading = () => {
    if (!getSavedQuotesApi.loading && getSavedQuotesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setReload(!reload);
    }
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <AppText style={styles.sectionTitle}>Saved Quotes</AppText>
        <Screen style={styles.screen}>
          <View
            style={[
              styles.card,
              { marginBottom: tabBarHeight + (serachBarVisible ? 60 : 10) },
            ]}
          >
            {getSavedQuotesApi.error ? (
              <>
                <AppText style={styles.title}>
                  Error Retrieving The Quotes.
                </AppText>
                <ActivityIndicator visible={getSavedQuotesApi.loading} />
                <AppErrorMessage visible={error} error={error} />
                <AppButton title="RETRY" onPress={handleRefresh} />
              </>
            ) : (
              <>
                <ActivityIndicator
                  visible={getQuoteApi.loading || deleteQuoteApi.loading}
                />
                <View style={styles.optionBar}>
                  <OptionButton
                    backgroundColor={null}
                    color={colors.primary}
                    border={null}
                    size={16}
                    modalTitle="Sort By"
                    initialValue="newest"
                    value={sort}
                    queryArray={sortByArray}
                    displayArray={sortByArray}
                    onSelect={(query) => {
                      setSort(query);
                      handleRefresh();
                    }}
                  />
                  <AppButton
                    icon={serachBarVisible ? "magnify-close" : "magnify"}
                    backgroundColor={null}
                    color={colors.primary}
                    border={false}
                    size={20}
                    badge={search !== ""}
                    onPress={() => setSearchBarVisible(!serachBarVisible)}
                  />
                </View>
                <View
                  style={
                    serachBarVisible
                      ? styles.searchBarVisible
                      : styles.searchBarInvisible
                  }
                >
                  <AppTextInput
                    icon="magnify"
                    placeholder="Make, Model, Registration"
                    style={styles.searchBar}
                    onChangeText={handleSearch}
                  />
                </View>
                <AppErrorMessage visible={error} error={error} />
                <FlatList
                  data={savedQuotes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Quote
                      data={item}
                      onOpenQuotePress={() => handleOpenQuotePress(item)}
                      onDeleteQuotePress={() => handleDeleteQuotePress(item.id)}
                    />
                  )}
                  ListFooterComponent={
                    <Loading visible={getSavedQuotesApi.loading} />
                  }
                  ListEmptyComponent={
                    <>
                      {!getSavedQuotesApi.loading && (
                        <AppText style={styles.title}>No Quotes Found</AppText>
                      )}
                    </>
                  }
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  onEndReached={handleLazyLoading}
                  onEndReachedThreshold={0.1}
                  style={{ paddingHorizontal: 20, paddingVertical: 10 }}
                />
              </>
            )}
          </View>
        </Screen>
        {deletedVisible && (
          <View style={styles.deletedContainer}>
            <AppText style={styles.deletedText}>Quote Deleted</AppText>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.label === nextProps.label;
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: colors.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    ...defaultStyles.shadow,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
    marginVertical: 10,
  },
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  searchBarVisible: {
    opacity: 1,
    marginHorizontal: 20,
  },
  searchBarInvisible: {
    height: 0,
    opacity: 0,
  },
  deletedContainer: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    backgroundColor: colors.success + "dd",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  deletedText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default memo(SavedQuotesScreen, arePropsEqual);
