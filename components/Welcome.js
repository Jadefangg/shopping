import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native"
import { getAuth, signInAnonymously } from "firebase/auth";

const Welcome = ({ navigation }) => { //pass the navigation prop
    const auth = getAuth();//this is the authentication object for the app
    const signInUser = () => { //function to sign in the user
        signInAnonymously(auth)//this is the function to sign in the user anonymously.
          .then(result => {
            navigation.navigate("ShoppingLists", {userID: result.user.uid });
            Alert.alert("Signed in Successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
      }
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Shopping Lists</Text>
      <TouchableOpacity style={styles.startButton} onPress={signInUser}>
        <Text style={styles.startButtonText}>Let's begin!</Text>
      </TouchableOpacity>
    </View>
    
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitle: {
    fontWeight: "600",
    fontSize: 45,
    marginBottom: 100
  },
  startButton: {
    backgroundColor: "#000",
    height: 50,
    width: "88%",
    justifyContent: "center",
    alignItems: "center"
  },
  startButtonText: {
    color: "#FFF",
  }
});

export default Welcome;