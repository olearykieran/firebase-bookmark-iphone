// BookmarksScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {firestore} from './firebaseConfig'; // Adjust the path as needed
import {collection, query, where, addDoc, getDocs} from 'firebase/firestore';

const BookmarksScreen = ({userId}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState({
    url: '',
    title: '',
    time: 0, // Assuming time is in seconds
  });

  const fetchBookmarks = async () => {
    const bookmarksRef = collection(firestore, 'Bookmarks');
    const q = query(bookmarksRef, where('userID', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      const bookmarksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  const addBookmark = async () => {
    if (!newBookmark.url || !newBookmark.title) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const bookmarksRef = collection(firestore, 'Bookmarks');
      await addDoc(bookmarksRef, {...newBookmark, userID: userId});
      console.log('Bookmark added successfully');
      setNewBookmark({url: '', title: '', time: 0}); // Reset form
      fetchBookmarks(); // Refresh bookmarks list
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Form for adding a new bookmark */}
      <TextInput
        style={styles.input}
        placeholder="Video URL"
        value={newBookmark.url}
        onChangeText={text => setNewBookmark({...newBookmark, url: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newBookmark.title}
        onChangeText={text => setNewBookmark({...newBookmark, title: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (in seconds)"
        value={String(newBookmark.time)}
        keyboardType="numeric"
        onChangeText={text =>
          setNewBookmark({...newBookmark, time: Number(text)})
        }
      />
      <Button title="Add Bookmark" onPress={addBookmark} />

      {/* List of bookmarks */}
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.bookmarkItem}>
            <Text>Title: {item.title}</Text>
            {/* Add other bookmark details you want to display */}
          </View>
        )}
      />
    </View>
  );
};

// Add some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  bookmarkItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
});

export default BookmarksScreen;
