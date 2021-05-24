import React from 'react';
import { SafeAreaView, StyleSheet, Image, } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';

const CustomDrawer = ({ props, signOut }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={{ uri: "https://via.placeholder.com/260x100.png" }}
        style={styles.headerImage}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Déconnexion" onPress={signOut} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: 260,
    height: 100,
    alignSelf: 'center',
    marginTop: 20
  },
});

export default CustomDrawer;
