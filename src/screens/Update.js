import React from "react";
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../components/page-header";
import { colors, spacing } from "../theme";
import Input from "../components/input";
import NoteImage from "../components/note-image";
import NoteColor from "../components/note-color";
import { firebase } from "../config";
import LogService from "../services/LogService";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLOR_OPTIONS = [
  { name: "red", color: colors.red },
  { name: "green", color: colors.green },
  { name: "blue", color: colors.blue },
];

export default function Update({ route }) {
  const {
    id: id,
    title: currentTitle,
    description: currentDescription,
    noteColor: currentNoteColor,
    image: currentImage
  } = route.params.note;
  const [title, setTitle] = React.useState(currentTitle);
  const [description, setDescription] = React.useState(currentDescription);
  const [noteColor, setNoteColor] = React.useState(currentNoteColor);
  const [image, setImage] = React.useState(currentImage);
  const [loading, setLoading] = React.useState(false);
  const userId = firebase.auth().currentUser.uid;
  const noteRef = firebase.firestore().collection("notes");

  const onUpdate = () => {
    if(title == '' || description == '') {
      LogService.showWarningMessage("Title & Description can not be empty");
      return
    }

    setLoading(true);
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    noteRef
      .doc(id)
      .update({ title, description, noteColor, image, updatedAt: timeStamp })
      .then(() => {
        setLoading(false);
        LogService.showSuccessMessage("Note updated successfully");
      })
      .catch((error) => {
        setLoading(false);
        LogService.showErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Note" showBackButton={true} emptyNotes={true} />
      <View>
        <View style={styles.headerView}>
          <NoteImage image={image} setImage={setImage} showText={false}/>
          <View style={styles.themeView}>
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
        <View style={styles.inputContainer}>
          <Input
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Input
            placeholder="Description"
            value={description}
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.lightGreen} />
        ) : (
          <TouchableOpacity onPress={onUpdate}>
            <MaterialCommunityIcons
              name="content-save-edit-outline"
              size={34} color={colors.lightGreen}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  photoContainer: {
    alignItems: "center",
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
    alignItems: 'flex-end',
    margin: spacing[5],
  },
});
