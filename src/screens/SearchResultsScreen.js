import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  meanBoxOffice,
  getMedianRating,
  getStandardDeviation,
  formatNumbers,
} from "../utils/helpers";
import { useState, useEffect } from "react";

export default function SearchResultsScreen({ navigation, route }) {
  const { results } = route.params;
  const [ratings, setRatings] = useState([]);
  const [boxOffice, setBoxOffice] = useState([]);
  const [boxOfficeTotal, setBoxOfficeTotal] = useState(0);

  useEffect(() => {
    const { ratingArr, boxOfficeArr, boxOfficeTotalNum } =
      parseResults(results);

    setRatings(ratingArr);
    setBoxOffice(boxOfficeArr);
    setBoxOfficeTotal(boxOfficeTotalNum);
  }, []);

  const parseResults = () => {
    const total = results.reduce(
      (acc, { rating, boxOffice }) => {
        let boxOfficeNum = boxOffice.slice(1, boxOffice.length);
        boxOfficeNum = boxOfficeNum.split(",").join("");
        boxOfficeNum = parseInt(boxOfficeNum);

        let newRating = rating.slice(0, rating.length - 1);
        newRating = parseInt(newRating);

        acc.boxOfficeTotalNum += boxOfficeNum;
        acc.boxOfficeArr.push(boxOfficeNum);
        acc.ratingArr.push(newRating);
        return acc;
      },
      { boxOfficeArr: [], ratingArr: [], boxOfficeTotalNum: 0 }
    );
    return total;
  };

  return (
    // TODO: Abstract this to avoid redundancy
    // Sorry about the lack of styling on this screen--I focused on functionality and ran out of time
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.gridItem}>Box Office Mean </Text>
        <Text style={[styles.gridItem, styles.gridItemRight]}>
          {formatNumbers(boxOfficeTotal / results.length)}
        </Text>
      </View>

      <View style={styles.flex}>
        <Text style={styles.gridItem}>Box Office SD </Text>
        <Text style={[styles.gridItem, styles.gridItemRight]}>
          {getStandardDeviation(boxOffice)}
        </Text>
      </View>

      <View style={styles.flex}>
        <Text style={styles.gridItem}>Median RT Score </Text>
        <Text style={[styles.gridItem, styles.gridItemRight]}>
          {getMedianRating(ratings)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  gridItem: {
    width: "50%",
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 5,
    borderRightWidth: 0,
  },
  gridItemRight: {
    borderLeftWidth: 0,
    borderRightWidth: 2,
  },
});
