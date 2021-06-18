import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import { AppErrorMessage } from "../../components/forms";
import AppButton from "../../components/AppButton";
import OptionButton from "../../components/OptionButton";
import AppTextInput from "../../components/AppTextInput";
import Background from "../../components/Background";
import Loading from "../../components/Loading";
import MySale from "./components/MySale";

import useApi from "../../hooks/useApi";
import client from "../../api/client";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import CarWarrantyVehicleDetailScreen1 from "./CarWarrantyVehicleDetailScreen1";

const sortByArray = ["newest", "oldest"];

function MySalesScreen({ navigation, route }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [serachBarVisible, setSearchBarVisible] = useState(false);
  const [mySales, setMySales] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState("newest");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);

  let endpoint = `api/car/warranty/sale?page=${pageCurrent}&sort=${sort}&search=${search}`;
  const getMySalesApi = useApi(() => client.get(endpoint));

  useEffect(() => {
    getMySales();
  }, [reload]);

  const getMySales = async () => {
    const result = await getMySalesApi.request();
    if (!result.ok) return setError(result.data.message);
    const newMySales = result.data.data;
    setMySales([...mySales, ...newMySales]);
  };

  const handleRefresh = () => {
    setMySales([]);
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

  const handleLazyLoading = () => {
    if (!getMySalesApi.loading && getMySalesApi.data.next_page_url) {
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
        <Screen style={styles.screen}>
          <AppText style={styles.sectionTitle}>My Sales</AppText>
          <View
            style={[
              styles.card,
              { marginBottom: tabBarHeight + (serachBarVisible ? 60 : 10) },
            ]}
          >
            {getMySalesApi.error ? (
              <>
                <AppText style={styles.title}>
                  Error Retrieving The Sales.
                </AppText>
                <ActivityIndicator visible={getMySalesApi.loading} />
                <AppErrorMessage visible={error} error={error} />
                <AppButton title="RETRY" onPress={handleRefresh} />
              </>
            ) : (
              <>
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
                  data={mySales}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <MySale
                      data={item}
                      onOpenPress={() =>
                        navigation.navigate(routes.MY_SALE_DETAIL, item.id)
                      }
                      onInvoicePress={() => {}}
                      onSchedulePress={() => {}}
                    />
                  )}
                  ListFooterComponent={
                    <Loading visible={getMySalesApi.loading} />
                  }
                  ListEmptyComponent={
                    <>
                      {!getMySalesApi.loading && (
                        <AppText style={styles.title}>No Sales</AppText>
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
      </KeyboardAvoidingView>
    </>
  );
}
CarWarrantyVehicleDetailScreen1;
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
});

export default MySalesScreen;
