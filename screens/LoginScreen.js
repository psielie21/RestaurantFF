import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, AsyncStorage } from "react-native";
import { connect } from "react-redux"
import { Mutation } from "react-apollo"
import gql from "graphql-tag";


import { login } from "../actions/user"

const LOGIN = gql`
mutation Login($emailOrUser: String!, $password: String!) {
  login(emailOrUser: $emailOrUser, password: $password)  {
    token
  }
}
`;

class LoginScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            emailOrUser: "",
            password: ""
        }
    }

    static navigationOptions = {
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        header: null
    }

    async _handleLogin(data){
        await AsyncStorage.setItem('@restauranttoken', data.login.token);
        this.props.login();
        this.props.navigation.navigate('App');
    }

    _handleRegister(){

    }

    render(){


        return(
            <View style={styles.root}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        R-FF
                    </Text>
                </View>

                <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
                    <TextInput
                        style={styles.emailOrUser}
                        placeholder="Email oder Username"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.emailOrUser}
                        onChangeText={emailOrUser => this.setState({ emailOrUser })}
                    />
                    <TextInput
                        style={styles.password}
                        placeholder="Password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        returnKeyType="go"
                        secureTextEntry
                        ref={input => (this.passwordInput = input)}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />

                    <Mutation mutation={LOGIN} onCompleted={(data) => this._handleLogin(data)}>
                        {(login, { data }) => (
                            <View style={styles.buttonContainer}>
                                <Button title="login" onPress={() => {
                                    login({ variables: {emailOrUser: this.state.emailOrUser, password: this.state.password} })
                                } }/>
                            </View>
                            )
                        }
                    </Mutation>
                    
                    
                </KeyboardAvoidingView>

                <View style={styles.registerContainer}>
                    <Button title="registrieren" onPress={() => this.props.navigation.navigate("Register") }/>
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
        flex: 11,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        flex: 5,
        padding: 40,
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    registerContainer: {
        flex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    logoText: {
        fontSize: 80,
        elevation: 4,
        fontWeight: "100",
    },
    emailOrUser: {
        fontSize: 18,
        height: 40
    },
    password: {
        fontSize: 18,
        height: 40
    },
    buttonContainer:  {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    }
  })

  export default connect(undefined, { login })(LoginScreen)