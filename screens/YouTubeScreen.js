import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import data from "../data";
import VideoItem from "../components/VideoItem"

export default class YouTubeScreen extends React.Component {
    render() {
        return(
            <View style={styles.body}>
                <FlatList 
                data={data.items}
                renderItem={(video) => <VideoItem video={video.item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: "#cccccc"}}></View>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {

    }
})