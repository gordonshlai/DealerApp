import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  LogBox,
} from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import {
  AppErrorMessage,
  AppFormDateTimePicker,
  AppFormField,
  AppFormPicker,
  FormImagePicker,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import Background from "../components/Background";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import client from "../api/client";
import { Formik } from "formik";
import dayjs from "dayjs";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import UploadScreen from "./UploadScreen";
import ToolTip from "../components/ToolTip";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const validationSchema = Yup.object().shape({
  make: Yup.string().required().label("Make"),
  model: Yup.string().required().label("Model"),
  registration: Yup.string().required().label("Registration"),
  mileage: Yup.number().required().label("Mileage"),
  colour: Yup.string().label("Colour"),
  fuel: Yup.string().required().label("Fuel"),
  engine_capacity: Yup.string().required().label("Engine Capacity (cc)"),
  registration_date: Yup.date().required().label("Registration Date"),
  year: Yup.string().required().label("Year"),
  mot_expiry: Yup.date().required().label("MOT Expiry"),
  transmission: Yup.string().label("Transmission"),
  seats: Yup.string().label("Seats"),
  doors: Yup.string().label("Doors"),
  body_style: Yup.string().label("Body Type"),

  title: Yup.string().required().label("Title"),
  sales_status: Yup.string().required().label("Sales Status"),
  tagline: Yup.string().label("Tagline"),
  retail_price: Yup.string().required().label("Retail Sale Price"),
  price_asking: Yup.string().label("Trade Sale Price"),
  price_civ: Yup.string().label("Stand Sale Price"),
  price_cap: Yup.string().label("Guide Sale Price"),
  description: Yup.string().label("Description"),
});

const fuelArray = ["Diesel", "Electric", "Hybrid", "Petrol"];
const transmissionArray = ["Automatic", "Semi-Automatic", "Manual"];
const body_styleArray = [
  "Hatchback",
  "Coupe",
  "Sedan",
  "Convertible",
  "Estate",
  "SUV",
  "Crossover",
  "Minivan/Van",
  "Pickup",
];
const sales_statusArray = ["In Stock", "Sold", "List For Trade"];

function VehicleDetailScreen({ route, navigation }) {
  const vehicleDetail = route.params;

  const { loadInventoryFlag, setLoadInventoryFlag } = useContext(AuthContext);

  const [error, setError] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const makesApi = useApi(() => client.get("api/car/makes"));
  const modelsApi = useApi((endpoint) => client.get(endpoint));

  const postInventoryApi = useApi((data, onUploadProgress) =>
    client.post("api/inventory/vehicles", data, {
      onUploadProgress: (progress) => {
        onUploadProgress(progress.loaded / progress.total);
      },
    })
  );

  const patchInventoryApi = useApi((data, onUploadProgress) =>
    client.patch("api/inventory/vehicles/" + vehicleDetail.id, data, {
      onUploadProgress: (progress) => {
        onUploadProgress(progress.loaded / progress.total);
      },
    })
  );

  const postImagesApi = useApi((id, formData, { onUploadProgress, header }) =>
    client.post("api/inventory/images?vehicle=" + id, formData, {
      onUploadProgress: (progress) => {
        onUploadProgress(progress.loaded / progress.total);
      },
      header,
    })
  );

  const deleteImageApi = useApi((id) =>
    client.delete("api/inventory/images/" + id)
  );

  useEffect(() => {
    makesApi.request();
    if (vehicleDetail && vehicleDetail.make) {
      modelsApi.request("api/car/models/" + vehicleDetail.make);
    }
  }, []);

  const handleSubmit = async (vehicleInput) => {
    setProgress(0);
    setUploadVisible(true);
    const data = {
      make: vehicleInput.make,
      model: vehicleInput.model,
      registration_date: vehicleInput.registration_date,
      engine_capacity: vehicleInput.engine_capacity,
      retail_price: vehicleInput.retail_price,
      registration: vehicleInput.registration,
      year: vehicleInput.year,
      mileage: vehicleInput.mileage,
      colour: vehicleInput.colour,
      body_style: vehicleInput.body_style,
      fuel: vehicleInput.fuel,
      transmission: vehicleInput.transmission,
      title: vehicleInput.title,
      seats: vehicleInput.seats,
      doors: vehicleInput.doors,
      tagline: vehicleInput.tagline,
      description: vehicleInput.description,
      price_asking: vehicleInput.price_asking
        ? vehicleInput.price_asking
        : "0.00",
      price_civ: vehicleInput.price_civ ? vehicleInput.price_civ : "0.00",
      price_cap: vehicleInput.price_cap ? vehicleInput.price_cap : "0.00",
      sales_status: sales_statusArray.indexOf(vehicleInput.sales_status),
      mot_expiry: vehicleInput.mot_expiry,
    };

    const result = vehicleDetail.id
      ? await patchInventoryApi.request(data, (progress) =>
          setProgress(progress / 3)
        )
      : await postInventoryApi.request(data, (progress) =>
          setProgress(progress / 3)
        );
    console.log(result);
    if (!result.ok) return setError(result.data.message);
    setProgress(1 / 3);

    if (vehicleDetail.images) {
      for (const originalImage of vehicleDetail.images) {
        let deleteImage = true;
        for (const inputImage of vehicleInput.images) {
          if (originalImage.id === inputImage.id) {
            deleteImage = false;
            break;
          }
        }
        if (deleteImage) {
          const deleteImageResponse = await deleteImageApi.request(
            originalImage.id
          );
          console.log(deleteImageResponse);
          if (!deleteImageResponse.ok)
            return setError(deleteImageResponse.data.message);
        }
      }
    }
    setProgress(2 / 3);

    let formData = new FormData();
    let newImages = false;
    for (const inputImage of vehicleInput.images) {
      if (!inputImage.id) {
        inputImage.name = inputImage.uri;
        formData.append("files[]", inputImage);
        newImages = true;
      }
    }
    if (newImages) {
      const vehicleId = vehicleDetail.id ? vehicleDetail.id : result.data.id;
      const postImagesResponse = await postImagesApi.request(
        vehicleId,
        formData,
        {
          onUploadProgress: (progress) => setProgress(progress / 3 + 2 / 3),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(postImagesResponse);
      if (!postImagesResponse.ok)
        return setError(postImagesResponse.data.message);
    }
    setProgress(1);
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={makesApi.loading || modelsApi.loading} />
      <UploadScreen
        onDone={async () => {
          setUploadVisible(false);
          navigation.popToTop();
          navigation.navigate(routes.INVENTORY);
          setLoadInventoryFlag(!loadInventoryFlag);
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView>
          <Screen>
            <View style={styles.informationContainer}>
              <Formik
                initialValues={{
                  make: vehicleDetail ? vehicleDetail.make : "",
                  model: vehicleDetail ? vehicleDetail.model : "",
                  registration: vehicleDetail ? vehicleDetail.registration : "",
                  mileage:
                    vehicleDetail && vehicleDetail.mileage
                      ? vehicleDetail.mileage.toString()
                      : "",
                  colour:
                    vehicleDetail && vehicleDetail.colour
                      ? vehicleDetail.colour
                      : "",
                  fuel:
                    vehicleDetail && vehicleDetail.fuel
                      ? vehicleDetail.fuel
                      : "",
                  engine_capacity:
                    vehicleDetail && vehicleDetail.engine_capacity
                      ? vehicleDetail.engine_capacity.toString()
                      : "",
                  year:
                    vehicleDetail && vehicleDetail.year
                      ? vehicleDetail.year.toString()
                      : "",
                  registration_date:
                    vehicleDetail && vehicleDetail.registration_date
                      ? new Date(dayjs(vehicleDetail.registration_date))
                      : "",
                  mot_expiry:
                    vehicleDetail && vehicleDetail.mot_expiry
                      ? new Date(dayjs(vehicleDetail.mot_expiry))
                      : "",
                  transmission:
                    vehicleDetail && vehicleDetail.transmission
                      ? vehicleDetail.transmission
                      : "",
                  seats:
                    vehicleDetail && vehicleDetail.seats
                      ? vehicleDetail.seats
                      : "",
                  doors:
                    vehicleDetail && vehicleDetail.doors
                      ? vehicleDetail.doors
                      : "",
                  body_style:
                    vehicleDetail && vehicleDetail.body_style
                      ? vehicleDetail.body_style
                      : "",

                  title:
                    vehicleDetail && vehicleDetail.title
                      ? vehicleDetail.title
                      : "",
                  sales_status:
                    vehicleDetail && vehicleDetail.sales_status
                      ? sales_statusArray[vehicleDetail.sales_status]
                      : sales_statusArray[0],
                  tagline:
                    vehicleDetail && vehicleDetail.tagline
                      ? vehicleDetail.tagline
                      : "",
                  retail_price:
                    vehicleDetail && vehicleDetail.retail_price
                      ? vehicleDetail.retail_price
                      : "",
                  price_asking:
                    vehicleDetail && vehicleDetail.price_asking
                      ? vehicleDetail.price_asking
                      : "",
                  price_civ:
                    vehicleDetail && vehicleDetail.price_civ
                      ? vehicleDetail.price_civ
                      : "",
                  price_cap:
                    vehicleDetail && vehicleDetail.price_cap
                      ? vehicleDetail.price_cap
                      : "",
                  description:
                    vehicleDetail && vehicleDetail.description
                      ? vehicleDetail.description
                      : "",
                  images:
                    vehicleDetail && vehicleDetail.images
                      ? vehicleDetail.images
                      : [],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ errors, values, setFieldValue, isValid, submitCount }) => (
                  <>
                    <AppText style={styles.sectionTitle}>
                      Vehicle Detail
                    </AppText>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Make</AppText>
                      <AppFormPicker
                        name="make"
                        placeholder="Please select"
                        items={makesApi.data}
                        onSelectItem={(item) => {
                          modelsApi.request("api/car/models/" + item);
                          if (values["make"] !== item) {
                            setFieldValue("model", "");
                          }
                        }}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Model</AppText>
                      <AppFormPicker
                        name="model"
                        placeholder="Please select"
                        items={modelsApi.data}
                        disabled={values["make"] === "" ? true : false}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Registration</AppText>
                      <AppFormField
                        name="registration"
                        placeholder="Registration"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Mileage</AppText>
                      <AppFormField
                        name="mileage"
                        placeholder="Miles"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Colour</AppText>
                      <AppFormField
                        name="colour"
                        placeholder="Colour"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Fuel</AppText>
                      <AppFormPicker
                        name="fuel"
                        placeholder="Please select"
                        items={fuelArray}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Engine Capacity (cc)
                      </AppText>
                      <AppFormField
                        name="engine_capacity"
                        placeholder="Engine Capacity (cc)"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Year</AppText>
                      <AppFormField
                        name="year"
                        placeholder="Year"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Registration Date
                      </AppText>
                      <AppFormDateTimePicker
                        name="registration_date"
                        placeholder="Please select"
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>MOT Expiry</AppText>
                      <AppFormDateTimePicker
                        name="mot_expiry"
                        placeholder="Please select"
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Transmission</AppText>
                      <AppFormPicker
                        name="transmission"
                        placeholder="Please select"
                        items={transmissionArray}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Seats</AppText>
                      <AppFormField
                        name="seats"
                        placeholder="Seats"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Doors</AppText>
                      <AppFormField
                        name="doors"
                        placeholder="Doors"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Body Style</AppText>
                      <AppFormPicker
                        name="body_style"
                        placeholder="Please select"
                        items={body_styleArray}
                      />
                    </View>

                    <AppText style={[styles.sectionTitle, { marginTop: 30 }]}>
                      Vehicle Description
                    </AppText>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Title (50 characters max)
                      </AppText>
                      <AppFormField
                        name="title"
                        placeholder="Title"
                        multiline={true}
                        textAlignVertical="center"
                        maxLength={50}
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Sale Status</AppText>
                      <AppFormPicker
                        name="sales_status"
                        placeholder="Please select"
                        items={sales_statusArray}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Tagline (80 characters max)
                      </AppText>
                      <AppFormField
                        name="tagline"
                        placeholder="Tagline"
                        multiline={true}
                        textAlignVertical="center"
                        maxLength={80}
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <View style={styles.toolTipContainer}>
                        <AppText style={styles.fieldTitle}>
                          Retail Sale Price
                        </AppText>
                        <ToolTip message="The forecourt sale price of the vehicle" />
                      </View>
                      <AppFormField
                        name="retail_price"
                        placeholder="Retail Sale Price"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <View style={styles.toolTipContainer}>
                        <AppText style={styles.fieldTitle}>
                          Trade Sale Price
                        </AppText>
                        <ToolTip message="The price you would like to sell the vehicle for directly to trade (if applicable)" />
                      </View>
                      <AppFormField
                        name="price_asking"
                        placeholder="Trade Sale Price"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <View style={styles.toolTipContainer}>
                        <AppText style={styles.fieldTitle}>
                          Stand Sale Price
                        </AppText>
                        <ToolTip message="The lowest price you would sell the vehicle for without losing money" />
                      </View>
                      <AppFormField
                        name="price_civ"
                        placeholder="Stand Sale Price"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <View style={styles.toolTipContainer}>
                        <AppText style={styles.fieldTitle}>
                          Guide Sale Price
                        </AppText>
                        <ToolTip message="The expected value of the vehicle (fill when selling directly to trade)" />
                      </View>
                      <AppFormField
                        name="price_cap"
                        placeholder="Guide Sale Price"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Description</AppText>
                      <AppFormField
                        name="description"
                        placeholder="Description"
                        multiline={true}
                        textAlignVertical="center"
                        style={styles.appFormField}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText
                        style={styles.fieldTitle}
                      >{`Images (${values["images"].length})`}</AppText>
                      <FormImagePicker name="images" />
                    </View>

                    <AppErrorMessage
                      error="Please fix the errors above before moving on."
                      visible={!isValid && submitCount}
                    />
                    <AppErrorMessage error={error} visible={error} />
                    <SubmitButton title="Save" />
                  </>
                )}
              </Formik>
              <AppButton
                title="Back"
                backgroundColor={null}
                color={colors.success}
                onPress={() => navigation.goBack()}
              />
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  informationContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
    ...defaultStyles.shadow,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldTitle: {
    color: defaultStyles.colors.mediumGrey,
  },
  appFormField: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  toolTipContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  modal: {
    padding: 20,
    backgroundColor: defaultStyles.colors.lightGrey,
    flex: 1,
    justifyContent: "center",
  },
});

export default VehicleDetailScreen;
