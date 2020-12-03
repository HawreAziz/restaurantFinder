import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { searchRestaurants } from "../actions";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" color={tintColor} size={30} />;
    },
  };

  state = {
    region: {
      latitude: 57.725836,
      longitude: 11.889067,
      latitudeDelta: 0,
      longitudeDelta: 0.05,
    },
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  setRegion = (region) => {
    this.setState({ region });
  };

  searchJobs = () => {
    this.props.searchRestaurants(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#00ff00" size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.setRegion}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Search Restaurants"
            onPress={this.searchJobs}
            buttonStyle={{ backgroundColor: "#009680", borderRadius: 10 }}
            icon={{ name: "search" }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
  },
};

export default connect(null, { searchRestaurants })(MapScreen);
