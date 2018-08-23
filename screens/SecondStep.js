import React from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Button} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";


export default class TestScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {stars:1}
    }
    static navigationOptions = {
        title: 'Details',
      };

    render(){
        const { navigation } = this.props;
        const city = navigation.getParam('city', 'ERROR');
        const name = navigation.getParam('name', 'ERROR');
        const address = navigation.getParam("address", "ERROR")
        const zip = navigation.getParam("zip", "ERROR")
        //const otherParam = navigation.getParam('otherParam', 'some default value');
      
        return (
          <View style={styles.root}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.textboxContainer}>
                <TextInput
                multiline 
                style={styles.textbox}
                placeholder={"Bewertung.."}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                />
            </View>

            <View style={styles.ratingContainer}>
                <TouchableOpacity onPress={() => this.setState({stars: 1})}> 
                    {this.state.stars >=1 ? (
                        <MaterialIcons name={"star"} size={30}/>
                    ) : (
                        <MaterialIcons name={"star-border"} size={30}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({stars: 2})}> 
                    {this.state.stars >=2 ? (
                        <MaterialIcons name={"star"} size={30}/>
                    ) : (
                        <MaterialIcons name={"star-border"} size={30}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({stars: 3})}> 
                    {this.state.stars >=3 ? (
                        <MaterialIcons name={"star"} size={30}/>
                    ) : (
                        <MaterialIcons name={"star-border"} size={30}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({stars: 4})}> 
                    {this.state.stars >=4 ? (
                        <MaterialIcons name={"star"} size={30}/>
                    ) : (
                        <MaterialIcons name={"star-border"} size={30}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({stars: 5})}> 
                    {this.state.stars == 5 ? (
                        <MaterialIcons name={"star"} size={30}/>
                    ) : (
                        <MaterialIcons name={"star-border"} size={30}/>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.submitContainer}>
                <Button style={styles.button} title="Speichern" onPress = {() => Alert.alert("Super")}/>
            </View>
            
          </View>
            
        )
    }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 33
  },
  textboxContainer: {
    height: 170,
    backgroundColor: '#F5FCFF',
    padding: 5,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  textbox : {
    height: 150,
    textAlignVertical: 'top',  
      
  },
  ratingContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 40
  },
  submitContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {

  }
})