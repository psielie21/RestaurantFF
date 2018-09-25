import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, AsyncStorage, ScrollView } from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux"
import { Mutation } from "react-apollo"
import gql from "graphql-tag";

import { login } from "../../actions/user"


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  email: t.String,
  firstName: t.String,
  lastName: t.String,
});

const options = {
    auto: 'placeholders',
    fields: {
      username: {
        // name field configuration here..
      },
      email: {
        keyboardType: "email-address",
      },
      password: {
          secureTextEntry: true,
      }
    }
  };


const SIGNUP = gql`
mutation Signup($username: String!, $password: String!, $email: String!, $firstName: String!, $lastName: String!) {
  signup(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName)  {
    token
  }
}
`;

class LoginScreen extends React.Component {
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

     async _handleAfterSignup(data){
        await AsyncStorage.setItem('@restauranttoken', data.signup.token);
        this.props.login();
        this.props.navigation.navigate('App'); //navigate inside the main switch navigator
        
    }

    render(){


        return(
            <View style={styles.root}>
                <View style={styles.formContainer}> 

                    <Form type={User} ref="regForm" options={options}/>

                        <Mutation mutation={SIGNUP} onCompleted={(data) => this._handleAfterSignup(data)}>
                            {(signup, { data }) => (
                                <View style={styles.buttonContainer}>
                                    <Button title="account erstellen" onPress={() => {
                                        //check if all forms are valid
                                        const values = this.refs.regForm.getValue();
                                        if(values != null){
                                            signup({ variables: {...values} })
                                        }
                                    } }/>
                                </View>
                                )
                            }
                        </Mutation>
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

  export default connect(undefined, { login })(LoginScreen);