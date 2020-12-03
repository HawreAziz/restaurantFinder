import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { Icon, Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import MapView from "react-native-maps";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review",
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => navigation.navigate("setting")}
          >
            <Text style={{ fontSize: 18, color: "blue" }}>Setting</Text>
          </TouchableOpacity>
        );
      },
    };
  };

  visitWebsite = (url) => {
    Linking.openURL(url);
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, marginBottom: 10 }}>
        {this.props.likedJobs?.map((restaurant) => {
          console.log(restaurant);
          const { id, alias, name, title } = restaurant;
          const { latitude, longitude } = restaurant.coordinates;
          return (
            <Card key={id}>
              <Card.Title>
                {restaurant?.categories[1]?.title || alias}
              </Card.Title>
              <MapView
                region={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.02,
                }}
                cacheEnabled={Platform.OS === "android"}
                style={styles.mapViewStyle}
                scrollEnabled={false}
              >
                <MapView.Marker coordinate={{ longitude, latitude }} />
              </MapView>
              <View style={styles.viewStyle}>
                <Text>{name}</Text>
                <Text>{restaurant.display_phone}</Text>
              </View>
              <Button
                title="Visit Website"
                onPress={() => this.visitWebsite(restaurant.url)}
              />
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = {
  mapViewStyle: {
    height: 200,
  },
  viewStyle: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

const mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
