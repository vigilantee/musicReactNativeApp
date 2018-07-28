import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";

class RowCard extends PureComponent {
    cardInject = () => {
        return (
          <View style={styles.columnContainer}>
          </View>
        );
      }

  rowInject = () => {
    let cards = [0,1,2];
    return (
      <View style={styles.rowContainer}>
      {cards.map(()=>
        this.cardInject()
      )}
      </View>
      );
    }

  render() {
    return (
        this.rowInject()
    );
  }
}

export default RowCard;
