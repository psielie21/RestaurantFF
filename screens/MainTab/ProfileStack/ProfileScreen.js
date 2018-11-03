import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag";
import { ImagePicker, Permissions, FileSystem } from "expo";
import { ReactNativeFile } from 'apollo-upload-client'

import { logout } from "../../../actions/user"
import connections from "../../../constants/Connection";

const ME_QUERY = gql`
  query {
    me {
      email
      username
      createdAt
      recs {
        _id
      }
      avatar
    }
  }
`;

const UPDATE_PROFILE_PICTURE = gql`
mutation UpdateProfilePicture($profilePicture: Upload) {
  updateMe(profilePicture: $profilePicture) {
    avatar
  }
}
`;

const { width, height } = Dimensions.get("window");

async function askAsyncMultiple(array){
  array = array instanceof Array ? array : arguments
  const result = []
  for(let i in array){
      let ask
      try {
          ask = await Expo.Permissions.askAsync(array[i])
      } catch(e) {
          ask = {status: 'error', error:e}
      }
      ask.type = array[i]
      result.push(ask)
  }
  return result
}

class HomeScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      imgUri: "",
      modalVisible: false
    }
  }
  static navigationOptions = {
    title: 'Profil',
  };

  _pickImage = async () => {
    askAsyncMultiple([
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    ])
    let result = await ImagePicker.launchCameraAsync({
      //mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1,1]
    })

    if(!result.cancelled){
      this.setState({
        imgUri: result.uri
      })

      return result.uri;
      //let pic = await FileSystem.readAsStringAsync(result.uri)
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Query query={ME_QUERY} onCompleted={(data) => console.log(data)}>
          {
            ({ loading, data, error }) => {
              if(loading){
                return <View><Text>Loading....</Text></View>
              }
              if(error){
                return <View><Text>Error</Text></View>
              }

              return (
                <View>
                  <View style={styles.imgContainer}>
                    <Mutation mutation={UPDATE_PROFILE_PICTURE} onCompleted={(data) => console.log(data)}>
                      {updatePicture => (
                        <TouchableOpacity onPress={async() => {
                          const uri = await this._pickImage();
                          const file = new ReactNativeFile({
                            uri: uri,
                            name: 'a.jpg',
                            type: 'image/jpeg'
                          })
                          updatePicture({ variables: {profilePicture: file} }) 
                        }} >
                          <View style={styles.imgWrapper} >
                            {data.me.avatar &&
                              <View>
                                <Image style={styles.img} source={{uri: "" + connections.baseUrl + data.me.avatar}}/>
                              </View>
                            }
                          </View>
                        </TouchableOpacity>
                        ) 
                      }
                    </Mutation>
                  </View>
                  <View style={styles.table}>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Email: </Text><Text style={styles.email}>{data.me.email}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Benutzername: </Text><Text style={styles.username}>{data.me.username}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Bewertungen: </Text><Text style={styles.recCount}>{data.me.recs.length}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Mitglied seit: </Text><Text style={styles.since}>{data.me.createdAt}</Text></Text></View>
                  </View>
                </View>
              )
            }
          }
            
          </Query>
          
          
          <Button title="Ausloggen" onPress={async() => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
            //await AsyncStorage.removeItem('@restauranttoken');
            //this.props.logout();
          }} color={"red"}></Button>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height/3,
    padding: 30,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  imgWrapper: {
    backgroundColor: "grey",
    height: 100,
    width: 100
  },
  img: {
    height: 100,
    width: 100
  },
  table: {
    marginTop: 30,
    padding: 10
  },
  wrapperText: {
    fontSize: 18,
  },
  firstCol: {

  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "blue"
  }
});

//export default connect(undefined , { logout })(HomeScreen)
export default HomeScreen