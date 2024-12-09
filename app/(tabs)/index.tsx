import { Alert, Image, StyleSheet, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import InputText from "@/components/InputText";
import BlinkText from "@/components/BlinkText";
import { Dropdown } from "react-native-paper-dropdown";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONSTANT from "../constant";

const stateDistrict = {
  Karnataka: [
    { label: "Bagalkot", value: "Bagalkot" },
    { label: "Bangalore Rural", value: "Bangalore Rural" },
    { label: "Bangalore Urban", value: "Bangalore Urban" },
    { label: "Belagavi (Belgaum)", value: "Belagavi (Belgaum)" },
    { label: "Ballari (Bellary)", value: "Ballari (Bellary)" },
    { label: "Bidar", value: "Bidar" },
    { label: "Chamarajanagar", value: "Chamarajanagar" },
    {
      label: "Chikkamagaluru (Chikmagalur)",
      value: "Chikkamagaluru (Chikmagalur)",
    },
    { label: "Chitradurga", value: "Chitradurga" },
    { label: "Davanagere", value: "Davanagere" },
    { label: "Dharwad", value: "Dharwad" },
    { label: "Gadag", value: "Gadag" },
    { label: "Gulbarga (Kalaburagi)", value: "Gulbarga (Kalaburagi)" },
    { label: "Hassan", value: "Hassan" },
    { label: "Haveri", value: "Haveri" },
    { label: "Kodagu", value: "Kodagu" },
    { label: "Kolar", value: "Kolar" },
    { label: "Koppal", value: "Koppal" },
    { label: "Mandya", value: "Mandya" },
    { label: "Mysuru (Mysore)", value: "Mysuru (Mysore)" },
    { label: "Raichur", value: "Raichur" },
    { label: "Ramanagara", value: "Ramanagara" },
    { label: "Shimoga (Shivamogga)", value: "Shimoga (Shivamogga)" },
    { label: "Tumakuru (Tumkur)", value: "Tumakuru (Tumkur)" },
    { label: "Udupi", value: "Udupi" },
    { label: "Uttara Kannada (Karwar)", value: "Uttara Kannada (Karwar)" },
    { label: "Vijayapura (Bijapur)", value: "Vijayapura (Bijapur)" },
    { label: "Vidhana Soudha", value: "Vidhana Soudha" },
    { label: "Yadgir", value: "Yadgir" },
    { label: "Chikkaballapur", value: "Chikkaballapur" },
    {
      label: "Dakshina Kannada (Mangalore)",
      value: "Dakshina Kannada (Mangalore)",
    },
  ],
};

type StateInIndia = keyof typeof stateDistrict;

const stateOptions: { label: string; value: StateInIndia }[] = [
  { label: "Karnataka", value: "Karnataka" },
];

const gradeOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [cmdName, setCmdName] = useState("");
  const [cmdPrice, setCmdPrice] = useState("");
  const [cmdCat, setCmdCat] = useState("");
  const [cmdGradeType, setCmdGradeType] = useState("");
  const [number, setNumber] = useState("");
  const [mandiDetails, setMandiDetails] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<null | boolean>(null);
  const [state, setState] = useState<StateInIndia>();
  const [district, setDistrict] = useState<string>();
  useEffect(() => {
    async function execThis() {
      try {
        const value = await AsyncStorage.getItem("mandi-id");
        const value1 = await AsyncStorage.getItem("mandi-details");
        if (value !== null && value1 !== null) {
          setIsLoggedIn(true);
          // console.log(value1);
          const mandiDetails = JSON.parse(value1);
          mandiDetails.mandiId = value;
          setMandiDetails(mandiDetails);
        }
      } catch (error) {
        console.log(error);
      }
    }
    execThis();
  }, []);
  console.log(mandiDetails);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: "https://img.freepik.com/premium-photo/digital-art-modern-farmer-using-advanced-technology-farm_702840-434.jpg",
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome{" "}
          {isLoggedIn === true ? (
            <ThemedText className="!text-yellow-800" type="title">
              {mandiDetails.name}
            </ThemedText>
          ) : (
            "To Farm Tech!"
          )}
        </ThemedText>
        <HelloWave />
      </ThemedView>
      {isLoggedIn === false ? (
        <>
          <ThemedView style={styles.stepContainer}>
            <BlinkText
              text={"You have not logged in. Start by entering your deatils!"}
              className="!text-red-500 text-xl"
            />
            <ThemedText type="subtitle">Step 1: Enter your Name</ThemedText>
            <InputText
              label="Name"
              placeholder="Type your name"
              text={text}
              onChangeText={(e) => {
                if (e.length > 50) {
                  return;
                }
                setText(e);
              }}
              maxDigit={`${text.length.toString()}/50`}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 2: Select Your State</ThemedText>
            <Dropdown
              label="State"
              mode="outlined"
              placeholder="Select State"
              options={stateOptions}
              value={state}
              onSelect={(val) => {
                if (val !== undefined) {
                  setState(val as StateInIndia);
                }
              }}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">
              Step 3: Select Your District
            </ThemedText>
            {state !== undefined ? (
              <Dropdown
                label="District"
                mode="outlined"
                placeholder="Select District"
                options={stateDistrict[state]}
                value={district}
                onSelect={(val) => {
                  if (val !== undefined) {
                    setDistrict(val);
                  }
                }}
              />
            ) : (
              <ThemedText className="!text-yellow-800">
                Select a{" "}
                <ThemedText className="!text-yellow-800" type="defaultSemiBold">
                  State first
                </ThemedText>{" "}
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">
              Step 4: Enter your Contact Details
            </ThemedText>
            <InputText
              label="Number"
              placeholder="Type your Number"
              text={number}
              onChangeText={(e) => {
                if (e.length > 10) {
                  return;
                }
                setNumber(e);
              }}
              maxDigit={`${number.length.toString()}/10`}
              keyboardType="numeric"
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 5: Submit</ThemedText>
            <View className="pt-5">
              <Button
                icon="firework"
                mode="contained"
                onPress={async () => {
                  try {
                    if (!text) {
                      Alert.alert("Enter your Name", "Name field is empty", [
                        {
                          text: "OK",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ]);
                      return;
                    }
                    if (!state) {
                      Alert.alert(
                        "Select your State",
                        "State has not been selected",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    if (!district) {
                      Alert.alert(
                        "Select your District",
                        "District has not been selected",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    if (!number) {
                      Alert.alert(
                        "Enter your Number",
                        "Number field is empty",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    const reqBody = {
                      name: text,
                      stateName: state,
                      districtName: district,
                      contact: {
                        contactType: "phone",
                        contactDetail: number,
                      },
                    };
                    setLoading(true);
                    const res = await fetch(
                      `${CONSTANT.backendLink}/create-user`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reqBody),
                      }
                    );
                    const jsonRes = await res.json();
                    console.log(jsonRes);
                    await AsyncStorage.setItem("mandi-id", jsonRes.mandiId);
                    await AsyncStorage.setItem(
                      "mandi-details",
                      JSON.stringify(reqBody)
                    );

                    setLoading(false);
                    setTimeout(() => {
                      setIsLoggedIn(true);
                      setLoading(null);
                    }, 1500);
                    setMandiDetails(jsonRes);
                    console.log(jsonRes);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Submit
              </Button>
            </View>
          </ThemedView>
          {loading !== null &&
            (loading === true ? (
              <Loading />
            ) : (
              <AfterLoading text={`Welcome ${text}`} />
            ))}
        </>
      ) : (
        <>
          <ThemedView style={styles.stepContainer}>
            <ThemedText className="!text-yellow-800">
              Enter{" "}
              <ThemedText className="!text-yellow-800" type="defaultSemiBold">
                Commodity name
              </ThemedText>{" "}
              and{" "}
              <ThemedText className="!text-yellow-800" type="defaultSemiBold">
                Price!
              </ThemedText>{" "}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">
              Step 1: Enter Commodity Name
            </ThemedText>
            <InputText
              label="Commodity Name"
              placeholder="Type your Commodity Name"
              text={cmdName}
              onChangeText={(e) => {
                setCmdName(e);
              }}
              maxDigit={`${cmdName.length.toString()}/50`}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">
              Step 2: Enter Commodity Price
            </ThemedText>
            <ThemedText className="!text-yellow-800">
              In{" "}
              <ThemedText className="!text-yellow-800" type="defaultSemiBold">
                Rupees
              </ThemedText>{" "}
            </ThemedText>
            <InputText
              label="Commodity Price"
              placeholder="Type your Commodity Price"
              text={cmdPrice}
              onChangeText={(e) => {
                setCmdPrice(e);
              }}
              keyboardType="numeric"
              maxDigit={`${cmdPrice.length.toString()}/10`}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">
              Step 3: Enter Commodity Category
            </ThemedText>
            <ThemedText className="!text-yellow-800">
              Fruits or{" "}
              <ThemedText className="!text-yellow-800" type="defaultSemiBold">
                Vegetables
              </ThemedText>{" "}
            </ThemedText>
            <InputText
              label="Commodity Category"
              placeholder="Type your Category"
              text={cmdCat}
              onChangeText={(e) => {
                setCmdCat(e);
              }}
              maxDigit={`${cmdCat.length.toString()}/30`}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 4: Select Grade Type</ThemedText>
            <Dropdown
              label="Grade Type"
              mode="outlined"
              placeholder="Select Grade Type"
              options={gradeOptions}
              value={cmdGradeType}
              onSelect={(val) => {
                if (val !== undefined) {
                  setCmdGradeType(val);
                }
              }}
            />
          </ThemedView>
          {/* await AsyncStorage.removeItem("mandi-id"); */}
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 5: Submit</ThemedText>
            <View className="pt-5">
              <Button
                icon="rocket-launch"
                mode="contained"
                onPress={async () => {
                  try {
                    if (!cmdName) {
                      Alert.alert(
                        "Enter Commodity Name",
                        "Commodity Name field is empty",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    if (!cmdPrice) {
                      Alert.alert(
                        "Enter Commodity Price",
                        "Commodity Price field is empty",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    if (!cmdCat) {
                      Alert.alert(
                        "Enter Commodity Category",
                        "Commodity Category field is empty",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    if (!cmdGradeType) {
                      Alert.alert(
                        "Select Commodity Grade Type",
                        "Commodity Grade Type has not been selected",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    const reqBody = {
                      categoryName: cmdCat,
                      cmdName: cmdName,
                      gradeType: cmdGradeType,
                      gradePrice: cmdPrice,
                      mandiId: mandiDetails.mandiId,
                    };
                    setLoading(true);
                    const res = await fetch(
                      `${CONSTANT.backendLink}/insert-commodity`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reqBody),
                      }
                    );
                    const jsonRes = await res.json();
                    console.log(jsonRes);
                    setLoading(false);
                    // setTimeout(() => {
                    //   setLoading(null);
                    // }, 1500);
                  } catch (error) {
                    setLoading(null);
                    console.log(error);
                  }
                }}
              >
                Submit
              </Button>
            </View>
          </ThemedView>
          {loading !== null &&
            (loading === true ? (
              <Loading />
            ) : (
              <AfterLoading1
                text={`Thank you for submitting the price of ${cmdName} ${
                  mandiDetails.name.split(" ")[0]
                }! Upload More 😊!`}
              />
            ))}
        </>
      )}
    </ParallaxScrollView>
  );
}

function Loading() {
  return (
    <ThemedView style={styles.stepContainer}>
      <View className="flex flex-row items-center justify-center  pr-7 pt-2">
        <ThemedText type="subtitle" className="!text-slate-600 !text-4xl">
          Loading
        </ThemedText>
        <ActivityIndicator
          className="pl-10"
          size={40}
          animating={true}
          color={MD2Colors.red800}
        />
      </View>
    </ThemedView>
  );
}

function AfterLoading({ text }: { text: string }) {
  return (
    <ThemedView style={styles.stepContainer}>
      <View className="flex flex-row items-center justify-center  pr-7 pt-2">
        <ThemedText type="subtitle" className="!text-slate-600 !text-2xl">
          {text}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

function AfterLoading1({ text }: { text: string }) {
  return (
    <ThemedView style={styles.stepContainer}>
      <View className="flex flex-row items-center justify-center  pr-7 pt-2">
        <ThemedText type="subtitle" className="!text-slate-600 !text-xl">
          {text}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
