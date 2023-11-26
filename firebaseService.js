export const fetchBookmarks = async userId => {
  const bookmarksQuery = query(
    collection(firestore, 'Bookmarks'),
    where('userID', '==', userId),
  );

  try {
    const querySnapshot = await getDocs(bookmarksQuery);
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};
