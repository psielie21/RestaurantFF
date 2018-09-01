import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, AsyncStorage, ScrollView } from "react-native";
import t from "tcomb-form-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  email: t.String,
  firstName: t.String,
  lastName: t.String,
});


export default class LoginScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            logoVisible: true
        }
    }

    static navigationOptions = {
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        title: "Registrieren"
    }

     _handleCreate(){
        const value = this.refs.regForm.getValue(); // use that ref to get the form value
        if(value != null){
            AsyncStorage.setItem("email", value.email);

        }
        
    }

    render(){


        return(
            <View style={styles.root}>
                <View style={styles.formContainer}> 

                    <Form type={User} ref="regForm" options={{ auto: 'placeholders' }}/>

                    
                    
                    <View style={styles.buttonContainer}>
                        <Button title="account erstellen" onPress={() => this._handleCreate()}/>
                    </View>
                 </View>
     

            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      display: "flex",
      backgroundColor: "#aeffe0"
    },
    logoContainer: {
        flex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        flex: 7,
        padding: 40,
        paddingTop: 30,
        backgroundColor: "rgba(255,255,255,0.7)",
        
    },
    logoText: {
        fontSize: 80,
        elevation: 4,
        fontWeight: "100",
    },
    input: {
        fontSize: 18,
        height: 40
    },
    buttonContainer:  {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
  })