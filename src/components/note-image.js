import React from "react";
import { StyleSheet, View, ActivityIndicator, Pressable, Image } from "react-native";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";
import * as ImagePicker from "expo-image-picker";


export default function NoteImage({ image, setImage, showText=true}) {
  const [isImageUploading, setIsImageUploading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, we need image permission to attach images into your notes!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsImageUploading(true);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });
      const ref = firebase
        .storage()
        .ref()
        .child(new Date().getTime().toString());
      const snapshot = await ref.put(blob);
      blob.close();
      const url = await snapshot.ref.getDownloadURL();
      setImage(url);
      setIsImageUploading(false);
    }
  };

  return (
    <View style={styles.photoContainer}>
        <Pressable onPress={pickImage} style={styles.photo}>
        {isImageUploading ? (
            <ActivityIndicator size="large" color={colors.lightGreen} />
        ) : image ? (
            <Image source={{ uri: image }} style={styles.image} />
        ) : (
            <AntDesign name="plus" size={50} color={colors.lightGreen} />
        )}
        </Pressable>
        {showText && <Text preset="small">Add photo</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  photoContainer: {
    alignItems: "center"
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.grey,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing[2],
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  }
});
