import React, { Component } from "react";
import { View, Text } from "react-native";
import Swipe from "../components/Swipe";
import { connect } from "react-redux";
import { Card, Icon } from "react-native-elements";
import MapView from "react-native-maps";
import { likeJob } from "../actions";

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Jobs",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" color={tintColor} size={30} />;
    },
  };
  renderCard = (restaurant) => {
    const {
      coordinates: { longitude, latitude },
      location,
    } = restaurant;
    return (
      <Card containerStyle={{ flex: 1, marginTop: 60 }}>
        <Card.Title>{restaurant?.name || restaurant?.alias}</Card.Title>
        <View style={{ height: 500 }}>
          <MapView
            scrollEnabled={false}
            cacheEnabled
            style={{ flex: 1 }}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0,
            }}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <View style={styles.ratingStyle}>
            <Text>{restaurant.rating}</Text>
            <Text>
              {restaurant.price === "$"
                ? "Cheap"
                : restaurant.price === "$$"
                ? "Common"
                : "Expensive"}
            </Text>
          </View>
          <View style={styles.description}>
            <Text>
              {location?.address1 || location?.address2 || location?.address3}
            </Text>
            <Text>{location?.city}</Text>
          </View>
        </View>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>No more restaurants</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Swipe
          data={this.props.restaurants}
          renderCard={this.renderCard}
          noMoreCards={this.renderNoMoreCards}
          onSwipeRight={(job) => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  ratingStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  descriptionStyle: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
};

const mapStateToProps = ({ restaurants }) => {
  return { restaurants };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);
