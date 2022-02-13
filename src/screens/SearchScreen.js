import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useState } from "react";

export default function SearchScreen({ navigation, route }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const handleResults = async (query) => {
    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${Constants.manifest.extra.OMDB_API_KEY}&t=${query}`
      );

      if (res.data["Response"] === "False") {
        setError(true);
        return;
      }

      const rottenTomatoesRating = res.data?.Ratings?.find((rating) => {
        return rating?.Source == "Rotten Tomatoes";
      });

      const newResult = {
        boxOffice: res.data.BoxOffice,
        rating: rottenTomatoesRating?.["Value"],
      };
      // this safeguard shouldn't be necessary but just in case
      let newResults = [...results, newResult] || [newResult];

      console.log({ newResults, count: newResults.length });
      setResults(newResults);
      // passing newResults instead of results to ensure data is present immediately (since setState is async)
      navigation.navigate("Results", { results: newResults });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const showErrors = () => {
    Alert.alert(
      "Something went wrong",
      "We couldn't find that movie. Please try again!"
    ),
      [
        {
          text: "OK",
          onPress: () => {
            setError(false);
          },
        },
      ];
  };

  // very minimal error handling to make this slightly more resilient
  const showError = () => {
    Alert.alert(
      "Something went wrong",
      "We couldn't find that movie. Please try again!",
      [
        {
          text: "OK",
          onPress: () => {
            setError(false);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={query}
        placeholder="Search for movies"
        onChangeText={(text) => setQuery(text)}
        style={styles.searchInput}
      />
      <Pressable style={styles.button} onPress={() => handleResults(query)}>
        <Text>Get Results</Text>
      </Pressable>
      {error ? showError() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    borderColor: "#0a0a0a",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    paddingLeft: 24,
    marginTop: 35,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
  },
  button: {
    backgroundColor: "#c4c4c4",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 8,
  },
});
