import React from "react";
import { Permissions, Location } from "expo";
import { ApolloConsumer } from "react-apollo";
import { TouchableOpacity, Alert } from "react-native";


const LocationButton = ({ handleData, children, query }) => {
    const getLocation = async() => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Alert.alert("GPS benötigt für die Karte")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const locString = location.coords.longitude + ", " + location.coords.latitude;
      return locString
    }
    
    return(
      <ApolloConsumer>
        {client => (
          <TouchableOpacity style={{ 
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }} onPress={async() => {
            const currentLocation = await getLocation();
            const data = await client.query({
              query, 
              variables: { coords: currentLocation }
            })
            handleData(data)
          }}>
            {
              children
            }              
          </TouchableOpacity>
          )
        }
      </ApolloConsumer>
    )
  }

export default LocationButton