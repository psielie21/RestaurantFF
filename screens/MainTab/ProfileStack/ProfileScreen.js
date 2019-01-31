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
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Query, Mutation, ApolloConsumer } from "react-apollo"
import gql from "graphql-tag";
import { ImagePicker, Permissions } from "expo";

const { ReactNativeFile } = require('apollo-upload-client')

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

const UPDATE_PROFILE_PIC = gql`
  mutation UpdateProfile($profilePicture: Upload){
    updateMe(profilePicture: $profilePicture){
      _id
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
      profilePicture:  require('../../../assets/images/default-avatar.png'),
      modalVisible: false,
      reloading: false
    }
  }
  static navigationOptions = {
    title: 'Profil',
  };

  _pickImageAndUpdate = async (update, refetch) => {
    askAsyncMultiple([
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    ])
    let result = await ImagePicker.launchCameraAsync({
      //mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.5
    })

    if(!result.cancelled){
      this.setState({
        profilePicture: {uri: result.uri}
      })
      let uriParts = result.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      const pictureObject = new ReactNativeFile({
        uri: result.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      update({ variables: { profilePicture: pictureObject }})
      refetch();
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Query query={ME_QUERY} notifyOnNetworkStatusChange>
          {
            ({ loading, data, error, refetch, client, networkStatus }) => {
              if(loading){
                return <Text>Loading....</Text>
              }
              if(error){
                return(
                  <Button title="ERROR - RETRY" onPress={async() => {               
                    refetch()
                  }} color={"blue"}>
                    {networkStatus === 4 &&
                      <ActivityIndicator size="large" color="#00ff00" />
                    }
                  </Button>
                )
              }

              const avatar = data.me.avatar ?  {uri: data.me.avatar} :  require('../../../assets/images/default-avatar.png')  ;

              return (
                <View>
                  <View style={styles.imgContainer}>
                    <Mutation mutation={UPDATE_PROFILE_PIC} refetchQueries={[{query: ME_QUERY}]}>
                      {(update, { loading })=> (
                        <TouchableOpacity onPress={() => this._pickImageAndUpdate(update, refetch)} >
                        <View style={styles.imgWrapper} >
                          <Image
                            source={{uri: data.me.avatar}}
                            style={styles.img}
                            resizeMode="cover"
                          />
                        </View>
                      </TouchableOpacity>
                      )}
                    </Mutation>
                    
                  </View>
                  
                  <View style={styles.table}>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Email: </Text><Text style={styles.email}>{data.me.email}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Benutzername: </Text><Text style={styles.username}>{data.me.username}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Bewertungen: </Text><Text style={styles.recCount}>{data.me.recs.length}</Text></Text></View>
                    <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Mitglied seit: </Text><Text style={styles.since}>{data.me.createdAt}</Text></Text></View>
                  </View>
                <ApolloConsumer>
                  { client => (
                    <Button title="Ausloggen" onPress={async() => {
                      await AsyncStorage.clear();
                      await client.clearStore();
                      this.props.navigation.navigate('Auth');
                    }} color={"red"}/>
                  )}
                </ApolloConsumer>
                </View>
              )
            }
          }
            
          </Query>
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