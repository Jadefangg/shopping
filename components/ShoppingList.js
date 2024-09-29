import { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";

const ShoppingLists = ({ db }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchShoppingLists = async () => { //this is the correct way to define an async function inside a useEffect hook
        const listsDocuments = await getDocs(collection(db, "shoppinglists"));
        let newLists = [];
        listsDocuments.forEach(docObject => {
          newLists.push({ id: docObject.id, ...docObject.data() })
        });
        setLists(newLists)
      }
    
      useEffect(() => {
        fetchShoppingLists();
      }, [`${lists}`]);
  return (
    <View>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.items.join(", ")}</Text>
        )}
      />
    </View>
  );
};

export default ShoppingLists;