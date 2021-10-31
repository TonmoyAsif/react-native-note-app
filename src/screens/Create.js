import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/text/text";
import PageHeader from "../components/page-header";
import { colors, spacing } from "../theme";
import Input from "../components/input";
import NoteColor from "../components/note-color";
import Button from "../components/button";
import { firebase } from "../config";
import LogService from "../services/LogService";
import NoteImage from "../components/note-image";

const COLOR_OPTIONS = [
  { name: "red", color: colors.red },
  { name: "green", color: colors.green },
  { name: "blue", color: colors.blue },
];

export default function Create({ navigation, user }) {
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [noteColor, setNoteColor] = React.useState('green');
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userId = user.uid;

  const onSave = () => {
    if(title == null || description == null) {
      LogService.showWarningMessage("Title & Description can not be empty");
      return
    }

    const noteRef = firebase.firestore().collection("notes");
    setLoading(true);
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      title,
      description,
      noteColor,
      image,
      authorId: userId,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    noteRef
      .add(data)
      .then((_doc) => {
        setLoading(false);
        navigation.navigate("Home");
        LogService.showSuccessMessage("Note created successfully");
      })
      .catch((error) => {
        setLoading(false);
        LogService.showErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Create Note" showBackButton={true} />
      <View>
        <NoteImage image={image} setImage={setImage}/>
        <View style={styles.inputContainer}>
          <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
          <Input
            placeholder="Description"
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.themeView}>
            <Text preset="medium" style={styles.themeText}>
              Note color:
            </Text>
            <View style={{ flexDirection: "row" }}>
              {COLOR_OPTIONS.map((option, index) => (
                <NoteColor
                  key={index}
                  label={option.name}
                  color={option.color}
                  value={noteColor}
                  setValue={setNoteColor}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.lightGreen} />
        ) : (
          <Button title="Save" onPress={onSave} />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: spacing[6],
    marginHorizontal: spacing[4],
  },
  themeView: {
    marginVertical: spacing[4],
  },
  themeText: {
    marginBottom: spacing[2],
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: spacing[5],
  },
});
