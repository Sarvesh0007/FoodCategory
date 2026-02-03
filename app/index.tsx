import { Image, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={{ flex: 1 }}
      className="items-center bg-[#FCF7EE] justify-center"
    >
      <Image
        source={{ uri: "https://www.firstclub.site/Logo.png" }}
        className="w-44 h-44 mb-4"
      />
      <Text className="text-2xl mb-6 font-bold text-gray-900 text-center">
        Welcome to First Club {"\n"}
        <Text className="text-gray-500 text-sm font-semibold text-center mb-4">
          India's Only quality first quick commerce app.
        </Text>
      </Text>
      <Pressable
        onPress={() => router.push("/categories")}>
        <View 
         className="bg-green-800 px-6 py-3 rounded-xl"
        >
        <Text className="text-white font-semibold text-sm">Browse Categories</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
