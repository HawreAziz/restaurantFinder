import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { facebookLogin } from "../actions";

class AuthScreen extends Component {
  facebookLogin = () => {
    this.props.facebookLogin();
    this.props.navigation.navigate("map");
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Button
          containerStyle={styles.buttonStyle}
          title="Sign in with faceboook"
          onPress={this.facebookLogin}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default connect(null, { facebookLogin })(AuthScreen);
