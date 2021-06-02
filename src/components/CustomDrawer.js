import React from 'react';
import { SafeAreaView, StyleSheet, Image, } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';

import { BRAND } from '../components/images/images';

const CustomDrawer = ({ props, signOut }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={BRAND}
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
    alignSelf: 'center',
    marginTop: 20
  },
});

export default CustomDrawer;
