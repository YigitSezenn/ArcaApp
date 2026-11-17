import AddModal from '@/components/AddModal';
import { Theme } from '@/lib/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

const selectedTint = Platform.select({
  ios: Theme.tabIconSelected,
  android: Theme.tabIconSelected,
  default: Theme.tabIconSelected,
});

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: selectedTint, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />,
        }}
      />
  
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarButton: () => <AddModal />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
