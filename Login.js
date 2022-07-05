import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {

  //using fetch, do a POST to https://dev.stedi.me/twofactorlogin/123-456-7890
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+ phoneNumber, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/text'
      },
  });
  const loginResponseText = await loginResponse.text();
  console.log('Login Response', loginResponseText);
};

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'POST',
    body:JSON.stringify([oneTimePassword, phoneNumber]),
    headers: {
       'Content-Type': 'application/json'
      }
  });

  const responseCode = loginResponse.status;
  console.log("Response Status Code", responseCode);
  if(responseCode == 500){
    setUserLoggedIn(true);
  }
  const loginResponseString = await loginResponse.text();
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholderTextColor="#4251f5"
        placeholder="123-456-7890"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{sendText(phoneNumber)}}
      
      >
        <Text>Send Text</Text>        
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor="#4251f5"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{getToken({phoneNumber, setUserLoggedIn:props.setUserLoggedIn});
      }}
      >
        <Text>Login</Text>        
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTo:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

export default Login;