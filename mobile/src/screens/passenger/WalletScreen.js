import React from "react";
import { View, Text, FlatList } from "react-native";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";
import { walletHistory } from "../../data/mock";

export default function WalletScreen(){
  return (
    <Screen>
      <FlatList
        data={walletHistory}
        keyExtractor={it=>it.id}
        ItemSeparatorComponent={()=> <View style={{ height:10 }} /> }
        renderItem={({ item })=>(
          <View style={{ backgroundColor:"#fff", borderRadius:12, padding:12, borderWidth:1, borderColor:colors.border, flexDirection:"row", justifyContent:"space-between" }}>
            <View>
              <Text style={{ fontWeight:"800" }}>{item.type}</Text>
              <Text style={{ color:"#555" }}>{item.when} • {item.ref}</Text>
            </View>
            <Text style={{ fontWeight:"800", color: item.amount<0?"#b00020":"#0a7" }}>
              {item.amount<0?"":"+"}Rs {Math.abs(item.amount).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </Screen>
  );
}
