import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../theme";
import { firebase } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/loading";
import Onboarding from "../components/onboarding";
import PageHeader from "../components/page-header";
import EmptyNotes from "../components/empty-notes";
import NoteItem from "../components/note-item";
import LogService from "../services/LogService";

export default function Home({ user }) {
  const [checking, setChecking] = React.useState(true);
  const [onboarded, setOnboarded] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const noteRef = firebase.firestore().collection("notes");
  const userId = user.uid;

  const getOnboardingValue = async () => {
    // await AsyncStorage.removeItem("onboarding");
    try {
      const value = await AsyncStorage.getItem("onboarding");
      if (value !== null) {
        setOnboarded(true);
      }
      setChecking(false);
    } catch (e) {
      setChecking(false);
    }
  };

  React.useEffect(() => {
    const subscriber = noteRef
      .where("authorId", "==", userId)
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const newNotes = [];
        snapshot.forEach((doc) => {
          newNotes.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNotes(newNotes);
      });
    return subscriber;
  }, []);

  React.useEffect(() => {
    getOnboardingValue();
  }, []);

  if (!onboarded) {
    return <Onboarding setOnboarded={setOnboarded} />;
  }

  if (checking) {
    return <Loading />;
  }

  const deleteNote = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Do you really want to delete the note?",
      [
        {
          text: "Yes",
          onPress: () => {
            noteRef.doc(id).delete();
            LogService.showSuccessMessage("Note deleted!");
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const renderItem = ({ item }) => <NoteItem note={item} onDeleteNote={deleteNote} />;

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="My Notes" showAddNoteButton={notes.length > 0} />
      {notes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          contentContainerStyle={{ margin: spacing[6]}}
          ItemSeparatorComponent={() => <View style={styles.item_separator}/>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_separator: {
    marginBottom: spacing[6]
  }
});
