import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { facebookLogout, clearJobs } from "../actions";

class SettingScreen extends Component {
  facebookLogout = () => {
    this.props.facebookLogout();
    this.props.navigation.navigate("wellcome");
  };

  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 10, justifyContent: "center" }}>
        <Button
          buttonStyle={{ marginVertical: 20 }}
          title="Logout"
          onPress={this.facebookLogout}
        />
        <Button
          title="Clear restaurants"
          onPress={this.props.clearJobs}
          buttonStyle={{ backgroundColor: "red" }}
          icon={{ name: "warning" }}
        />
      </View>
    );
  }
}

const styles = {
  btnStyle: {
    backgroundColor: "red",
  },
};

export default connect(null, { facebookLogout, clearJobs })(SettingScreen);
