import { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from "react-native";
import { collection, getDocs, addDoc, onSnapshot, query, where } from "firebase/firestore";

const ShoppingLists = ({ db }) => {
    
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');

  useEffect(() => { //hook to fetch the shopping lists from the database
    const unsubShoppinglists = onSnapshot(collection(db, "shoppinglists"), (documentsSnapshot) => {
      let newLists = [];
      documentsSnapshot.forEach(doc => {
        newLists.push({ id: doc.id, ...doc.data() })
      });
      setLists(newLists);
    });

    // this is used to unsubscribe from the snapshot listener and clean up the listener
    return () => {
      if (unsubShoppinglists) unsubShoppinglists();
    }
  }, []);

  const addShoppingList = async (newList) => { //function to add a new shopping list
    const newListRef = await addDoc(collection(db, "shoppinglists"), newList);
    if (newListRef.id) {
      setLists([newList, ...lists]);
      Alert.alert(`The list "${listName}" has been added.`);
    } else {
      Alert.alert("Unable to add. Please try later");
    }
  }
  return (  //UI for the shopping list
    <View style={styles.container}>
      <FlatList
        style={styles.listsContainer}
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={styles.listItem}>
            <Text>{item.name}: {item.items.join(", ")}</Text>
          </View>
        }
      />
      <View style={styles.listForm}>
        <TextInput
          style={styles.listName}
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
        />
        <TextInput
          style={styles.item}
          placeholder="Item #1"
          value={item1}
          onChangeText={setItem1}
        />
        <TextInput
          style={styles.item}
          placeholder="Item #2"
          value={item2}
          onChangeText={setItem2}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addShoppingList}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

export default ShoppingLists;