import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { facebookLogin } from "../actions";
import { AppLoading } from "expo";

const SLIDE_WIDTH = Dimensions.get("window").width;

const SLIDE_DATA = [
  { text: "Wellcome to this app", color: "#414349" },
  { text: "Introduction to this app", color: "#414942" },
  { text: "This is how this app is working", color: "#6559A5" },
];

class WellcomeScreen extends Component {
  state = { isReady: false };

  componentDidMount() {
    handleToken = async () => {
      try {
        const token = await AsyncStorage.getItem("fb_token");
        if (token) {
          this.setState({ isReady: true });
          this.props.navigation.navigate("map");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleToken();
  }

  onComplete(index) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <Button
          title="Onwards!"
          buttonStyle={{ backgroundColor: "rgba(0,0,0,0)", marginTop: 20 }}
          onPress={() => this.props.navigation.navigate("auth")}
        />
      );
    }
  }

  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text key={slide.text} style={styles.slideTextStyle}>
            {slide.text}
          </Text>
          {this.onComplete(index)}
        </View>
      );
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          pagingEnabled
          bouncesZoom
          onScroll={this.onScrollChange}
          showHorizontalScrollIndicator={false}
        >
          {this.renderSlides()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SLIDE_WIDTH,
  },
  slideTextStyle: {
    fontSize: 32,
    width: 300,
    color: "#12EDF7",
  },
};

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return { token };
};

export default connect(mapStateToProps, { facebookLogin })(WellcomeScreen);
