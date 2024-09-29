import { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { collection, getDocs } from "firebase/firestore";

const ShoppingLists = ({ db }) => {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');

  useEffect(() => {
    const fetchShoppingLists = async () => {
      const listsDocuments = await getDocs(collection(db, "shoppinglists"));
      let newLists = [];
      listsDocuments.forEach(docObject => {
        newLists.push({ id: docObject.id, ...docObject.data() });
      });
      setLists(newLists);
    };

    fetchShoppingLists();
  }, [db]);

  return (
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
          onPress={() => { }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

export default ShoppingLists;