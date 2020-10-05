import React from 'react';
import {
  StyleSheet,
  Text, TextInput,
  Button,
  View, SafeAreaView, ScrollView,
  Keyboard
} from 'react-native';

class Banner extends React.Component {
  render() {
    return (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>ToDo example with React Native</Text>
        </View>
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', containsText: false };
  }

  addToDoItem = () => {
    if (this.state.text !== '') {
      this.setState({
        items: [...this.state.items, this.state.text],
        text: '',
        containsText: true,
      });
      Keyboard.dismiss();
    }
  }

  deleteToDoItem = (index) => {
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({
      items: items,
      containsText: (items.length !== 0),
    });
  }

  render() {
    let items = this.state.items.map((item, index) => {
      return (
          <ListItem text={item} key={index} index={index} containsText={true}
                deleteToDoItem={this.deleteToDoItem}/>
      )
    });

    return (
        <View>
          <View style={styles.addToDo}>
            <TextInput
                style={styles.addToDoTextInput}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}/>
            <Button
                title="Add" style={styles.addTodoButton}
                onPress={this.addToDoItem}/>
          </View>
          <ScrollView style={styles.list}>
            {items}
          </ScrollView>
        </View>
    );
  }
}

class ListItem extends React.Component {
  deleteToDoItem = (index) => {
    this.props.deleteToDoItem(index);
  }
  
  render() {
    return (
        <View style={styles.listItem}>
          <Text style={styles.listItemText }>* {this.props.text}</Text>
          <Text style={styles.listItemDelete}
                onPress={(e) => this.deleteToDoItem(this.props.index)}>X</Text>
        </View>
    )
  }

  // render() {
  //   const hasText = this.props.containsText;
  //   let text;
  //   let icon;
  //   if (hasText) {
  //     text = <Text style={styles.listItemText }>* {this.props.text}</Text>;
  //     icon = <Text style={styles.listItemDelete}
  //               onPress={(e) => this.deleteToDoItem(this.props.index)}>X</Text>;
  //   } else {
  //     text = '';
  //     icon = '';
  //   }
  //
  //   return (
  //       <View style={styles.listItem}>
  //         <Text>{text}</Text>
  //         <Text>{icon}</Text>
  //       </View>
  //   )
  // }

}

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <Banner />
        <ToDoList />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  listItemText: {
  },
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  addTodoButton: {
    color: 'cadetblue',
  },
});