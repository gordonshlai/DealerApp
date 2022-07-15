import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import OptionButton from "../../../components/OptionButton";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

/**
 * The option bar in the inventory screen, allowing filter vehicles by makes and search vihicles by registration
 *
 * @param {string} make the make of the vehicles
 * @param {function} setMake the function setting the selected vehicle make
 * @param {array} makesArray the array containing a list of avalible vehicle makes
 * @param {string} search the vehicle registration to be searched
 * @param {function} setSearch the function setting the search parameter
 * @param {function} handleRefresh the function handling the page refresh
 * @returns
 */
const OptionBar = ({
  make,
  setMake,
  makesArray,
  search,
  setSearch,
  handleRefresh,
}) => {
  const [serachBarVisible, setSearchBarVisible] = useState(false);

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

  return (
    <>
      <View style={styles.optionBar}>
        <OptionButton
          title={make.toUpperCase()}
          backgroundColor={null}
          color={colors.primary}
          border={false}
          icon="car"
          size={16}
          modalTitle="Filter"
          initialValue="all"
          value={make}
          queryArray={makesArray}
          displayArray={makesArray}
          onSelect={(query) => {
            setMake(query);
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
          serachBarVisible ? styles.searchBarVisible : styles.searchBarInvisible
        }
      >
        <AppTextInput
          icon="magnify"
          placeholder="Enter Your Registration"
          style={styles.searchBar}
          onChangeText={handleSearch}
        />
      </View>
    </>
  );
};

export default OptionBar;

const styles = StyleSheet.create({
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
