import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const firebaseConfig = {
 
};

firebase.initializeApp(firebaseConfig);

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => setErrorMessage(error.message));
  };

  useEffect(() => {
    // Redirect to the product page after successful login
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Product');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

// Product Stack Navigator
const ProductStackNavigator = createStackNavigator({
  Product: {
    screen: ProductScreen,
    navigationOptions: {
      headerTitle: 'Product Page',
    },
  },
});

// Top Tab Navigator
const TopTabNavigator = createMaterialTopTabNavigator({
  Tab1: {
    screen: Tab1Screen,
    navigationOptions: {
      title: 'Tab 1',
    },
  },
  Tab2: {
    screen: Tab2Screen,
    navigationOptions: {
      title: 'Tab 2',
    },
  },
});

// Bottom Tab Navigator
const BottomTabNavigator = createBottomTabNavigator({
  Tab1: {
    screen: Tab1Screen,
    navigationOptions: {
      title: 'Tab 1',
    },
  },
  Tab2: {
    screen: Tab2Screen,
    navigationOptions: {
      title: 'Tab 2',
    },
  },
});

// Drawer Navigator
const DrawerNavigator = createDrawerNavigator({
  Drawer: {
    screen: DrawerScreen,
  },
});

// Product Page with Stack, Top Tab, Bottom Tab, and Drawer Navigation
const ProductPage = createStackNavigator(
  {
    ProductStack: {
      screen: ProductStackNavigator,
      navigationOptions: {
        title: 'Product Stack',
        headerLeft: <DrawerButton />,
      },
    },
    {
    initialRouteName: 'ProductStack',
    }
    );
    
    ProductPage.navigationOptions = ({ navigation }) => {
    const index = navigation.state.index;
    const activeRoute = navigation.state.routes[index];
    
    // Display the top tab navigator for the Tab1 or Tab2 screen
    if (activeRoute.routeName === 'Tab1' || activeRoute.routeName === 'Tab2') {
    return {
    header: null,
    tabBarComponent: props => <TopTabNavigator {...props} />,
    };
    }
    
    // Display the bottom tab navigator for the other screens
    return {
    header: null,
    tabBarComponent: props => <BottomTabNavigator {...props} />,
    };
    };
    
    const DrawerButton = () => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <View style={{ marginLeft: 10 }}>
    <Ionicons name="md-menu" size={30} />
    </View>
    </TouchableOpacity>
    );
    
    // App Stack Navigator
    const AppStackNavigator = createStackNavigator({
    Login: {
    screen: LoginScreen,
    navigationOptions: {
    headerShown: false,
    },
    },
    Product: {
    screen: ProductPage,
    navigationOptions: {
    headerShown: false,
    },
    },
    });
    
    const AppContainer = createAppContainer(AppStackNavigator);
    
    export default AppContainer;      