import React from "react";
import { View, FlatList } from "react-native";
import Screen from "../../components/Screen";
import SuggestionCard from "../../components/SuggestionCard";
import { riderSuggestions } from "../../data/mock";

export default function SuggestionsScreen({ navigation }){
  return (
    <Screen>
      <FlatList
        data={riderSuggestions}
        keyExtractor={it=>it.id}
        ItemSeparatorComponent={()=> <View style={{ height:12 }} /> }
        renderItem={({ item })=> <SuggestionCard item={item} onPress={()=> navigation.navigate("RiderProfile", { id:item.id })} /> }
      />
    </Screen>
  );
}
