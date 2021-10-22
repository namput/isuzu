import React, { useState } from "react";
import { AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card, Image,Button,Icon } from "react-native-elements";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AppLoading } from "expo";
// import { Icon } from "react-native-vector-icons/Icon";

function LoginScreen() {
  const navigation = useNavigation();
  const [lang, setLang] = useState("TH");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("eye-off");
  const [showPassword, setShowPassword] = useState(true);
  const WIDTH = Dimensions.get("window").width;

  // ดูรหัสผ่าน
 const _changeIcon = () => {
    setIcon(icon === "eye" ? "eye-off" : "eye");
    setShowPassword(!showPassword);
  };

  // เปลี่ยนภาษาไทย
 const onPressTH = async () => {
    setLang("TH");
    await AsyncStorage.setItem("language", "TH");
  };

  // เปลี่ยนภาษาอังกฤษ
const  onPressEN = async () => {
    setLang("EN");
    await AsyncStorage.setItem("language", "EN");
  };
const  checkdata = () => {
    Alert.alert("5553335");
    let params = { username: "admin", password: "password" };
    console.log(params);
    httpClient.post(`/Login`, params).then((res) => {
      console.log(res.data);
    });
  };
  // Login
const  onLoginPressed = () => {
    try {
      let params = { username: username, password: password };
      httpClient
        .post("/Login", params)
        .then(async (response) => {
          const res = response.data;

          if (res.err === "Please enter Username") {
            lang === "EN"
              ? Alert.alert("Please enter Username.")
              : Alert.alert("กรุณากรอก ชื่อผู้ใช้งาน");
          } else if (res.err === "Please enter password") {
            lang === "EN"
              ? Alert.alert("Please enter password.")
              : Alert.alert("กรุณากรอก พาสเวิร์ด");
          } else if (res.err === "Invalid Employee code") {
            lang === "EN"
              ? Alert.alert("Employee code Username.")
              : Alert.alert("ชื่อผู้ใช้งานไม่ถูกต้อง");
          } else if (res.err === "Invalid password") {
            lang === "EN"
              ? Alert.alert("Invalid password.")
              : Alert.alert("พาสเวิร์ด ไม่ถูกต้อง");
          }

          if (res.result === "success") {
            // save user id and token
            await AsyncStorage.setItem("userId", res.id);
            await AsyncStorage.setItem("fullnameTH", res.fullnameTH);
            await AsyncStorage.setItem("fullnameEN", res.fullnameEN);
            await AsyncStorage.setItem("token", res.token);
            navigation.dispatch(StackActions.replace("Main"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
 
    return (
      <View style={{ flex: 1, backgroundColor: "#DC143C" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: "75%",
              top: "8%",
              backgroundColor: "#e6e6e6",
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "row", padding: 5 }}>
              {/* ตัวเปลี่ยนภาษาไทย */}
              <TouchableOpacity onPress={onPressTH}>
                <Text style={lang === "TH" ? styles.active : styles.noActive}>
                  TH
                </Text>
              </TouchableOpacity>

              {/* ตัวคั่น / */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {" "}
                /{" "}
              </Text>

              {/* ตัวเปลี่ยนภาษาอังกฤษ */}
              <TouchableOpacity onPress={onPressEN}>
                <Text style={lang === "EN" ? styles.active : styles.noActive}>
                  EN
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logo(ISUZU) */}
          <Image
            source={require("./asset/Logo/isuzuLog.png")}
            resizeMode={"stretch"}
            style={styles.logo}
          />

          {/* กรอบเข้าสู่ระบบ */}
          <Card
            containerStyle={{
              overflow: "hidden",
              flexDirection: "column",
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderRadius: 10,
              padding: 20,
              backgroundColor: "#fff",
            }}
          >
            <Text style={styles.text1}>
              {lang === "EN" ? "Login" : "เข้าสู่ระบบ"}
            </Text>

            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                }}
              >
                <Icon
                  style={{ padding: 8 }}
                  name="ios-contact"
                  size={20}
                  color="#000"
                />

                <TextInput
                  style={styles.inputLogin}
                  placeholder={lang === "EN" ? "Username" : "ชื่อผู้ใช้งาน"}
                  onChangeText={(text) => setUsername(text)}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 18,
                  marginBottom: 4,
                  borderBottomWidth: 1,
                }}
              >
                <Icon
                  style={{ paddingTop: 8, paddingLeft: 10, paddingRight: 8 }}
                  name="ios-lock"
                  size={20}
                  color="blue"
                />

                <TextInput
                  style={styles.inputPass}
                  placeholder={lang === "EN" ? "Password" : "รหัสผ่าน"}
                  secureTextEntry={showPassword}
                  onChangeText={(text) => setPassword(text)}
                />
                <Icon
                  style={{ padding: 8 }}
                  name={icon}
                  onPress={_changeIcon}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
              underlayColor={"#d9d9d9"}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordButtonText}>
                {lang === "EN" ? "Forgot password?" : "ลืมรหัสผ่าน?"}
              </Text>
            </TouchableOpacity>

            <Button onPress={onLoginPressed} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>
                {lang === "EN" ? "Login" : "เข้าสู่ระบบ"}
              </Text>
            </Button>
            <Button onPress={checkdata} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>
                {lang === "EN" ? "Login" : "เข้าสู่ระบบ"}
              </Text>
            </Button>
          </Card>
        </View>
      </View>
    );
}

const stylesdialog = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    // margin:5
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
const styles = StyleSheet.create({
  active: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002266",
  },
  noActive: {
    fontSize: 20,
    fontWeight: "100",
    color: "gray",
  },
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  image: {
    flex: 0.5,
    flexDirection: "column",
    resizeMode: "contain",
    justifyContent: "center",
  },
  logo: {
    marginTop: 50,
    alignSelf: "center",
    height: 90,
    width: 300,
    marginBottom: 15,
  },
  text1: {
    fontFamily: "Kanit_400Regular",
    marginTop: 20,
    alignSelf: "center",
    // fontWeight: 'bold',
    fontSize: 25,
    color: "black",
    marginBottom: 30,
  },
  inputLogin: {
    flex: 8,
    height: 50,
    width: "100%",
    padding: 12,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    borderColor: "grey",
  },
  inputPass: {
    flex: 8,
    height: 50,
    width: "100%",
    padding: 15,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    borderColor: "grey",
  },
  loginButton: {
    height: 45,
    backgroundColor: "#DC143C",
    alignSelf: "stretch",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  registerButton: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 0,
    justifyContent: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingRight: 15,
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFF",
    alignSelf: "center",
    fontFamily: "Kanit_600SemiBold",
  },
  labelRegister: {
    fontSize: 16,
    color: "#0007",
    alignSelf: "center",
  },
  registerButtonText: {
    paddingLeft: 5,
    fontSize: 16,
    color: "#002266",
    alignSelf: "center",
  },
  forgotPasswordButtonText: {
    fontSize: 14,
    color: "grey",
    alignSelf: "center",
    fontFamily: "Kanit_400Regular",
  },
  heading: {
    fontSize: 30,
    marginBottom: 40,
  },
  error: {
    color: "red",
    paddingTop: 10,
  },
  success: {
    color: "green",
    paddingTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoginScreen;
