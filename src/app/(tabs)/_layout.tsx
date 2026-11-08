import { Theme } from '@/lib/theme';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
//import { Tabs } from 'expo-router';
const selectedTint = Platform.select({
  ios: Theme.tabIconSelected,
  android: Theme.tabIconSelected,
  default: Theme.tabIconSelected,
});
export default function TabLayout() {
  return (
      <NativeTabs
        backgroundColor={Theme.tabBackground}
        tintColor={selectedTint}
        iconColor={{ default: Theme.tabIcon, selected: selectedTint }}
        indicatorColor={Theme.tabIndicator}
        labelStyle={{
          default: { color: Theme.tabLabel },
          selected: { color: Theme.tabLabelSelected },
        }}
      >
     <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name = "add"  >
        <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="plus.circle.fill" md="plus_one" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

      // <Tabs screenOptions={{ tabBarActiveTintColor: 'green', headerShown:false }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="add"
        
    //     options={{
    //       title: 'Add',
          
    //       tabBarIcon: ({ color }) => <FontAwesome size={26} name='cart-plus' color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //   name="settings"
    //   options={{
    //       title: 'Settings',
    //       tabBarIcon: ({ color }) => <FontAwesome size={26} name="cog" color={color} />
    //     }}
    //   />

    // </Tabs>