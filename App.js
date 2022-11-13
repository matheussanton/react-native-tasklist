import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons'

import Tarefa from './src/Tarefa'

export default function App() {

  const [task, setTask] = useState('');

  const [list, setList] = useState([]);

  function handleAddTask() {

    if (task === "") return;

    setList(oldList => [
      {
        key: Date.now(),
        item: task
      },
      ...oldList
    ])

    setTask('');
  }

  function handleDelete(item) {
    let filteredItems = list.filter((task) => {
      return (task.item !== item)
    })

    setList(filteredItems)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder='Digite sua terefa..'
          value={task}
          onChangeText={(text) => setTask(text)} />

        <TouchableOpacity style={styles.buttonAdd}
          onPress={handleAddTask}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)} />}
        style={styles.list}
      />


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input: {
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 10
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '4%'
  }
})
