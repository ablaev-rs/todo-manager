import { BASE_URL } from '@env'
import init from 'startupjs/init'
import orm from './model'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  observer,
  useDoc,
  useApi
} from 'startupjs'
import axios from 'axios'
import './Root.styl'
import { Navlink, Todoform, Todolist } from './components'

// Init startupjs connection to server and the ORM.
// baseUrl option is required for the native to work - it's used
// to init the websocket connection and axios.
// Initialization must start before doing any subscribes to data.
init({ baseUrl: BASE_URL, orm })

export default observer(function Root () {

  let [task, setTask] = useState([
      {
        id: 2,
        name: "close second task",
        status: "close"
      },
      {
        id: 3,
        name: "close qwerty task",
        status: "close"
      },
      {
        id: 4,
        name: "new asdfghj task",
        status: "open"
      },
      {
        id: 5,
        name: "new zxcvbnm task",
        status: "open"
      },
  ]);

  function addTask(taskname) {
    const newTodo = {
      id: Date.now(),
      name: taskname,
      status: "open"
    }
    setTask( prev => [...task, newTodo])
  }

  function closeTask(id) {
    let newTask = []
    task.map( el => {
      el.id === id ? el.status = "close" : el  
      newTask.push(el)
    })
    setTask(newTask)
  }
  
  function openTask(id) {
  let newTask = []
  task.map( el => {
    el.id === id ? el.status = "open" : el  
    newTask.push(el)
  })
  setTask(newTask)
  }

  function deleteTask(id) {
    setTask( prev => prev.filter( el => el.id !== id))
  }


  const [edit, setEdit] = useState({
    editStatus: false,
    id: null
  })

  const [newEditValue, setNewEditValue] = useState('')



  function changeEditStatus (id, editStatus, name) {
    setEdit({
      editStatus: editStatus,
      id: id
    })
    setNewEditValue(name)
  }

  function saveEditedTask(id, name) {
    let newTask = []
      task.map( el => {
        el.id === id ? el.name = name : el  
        newTask.push(el)
        changeEditStatus(el.id, false)
      })
      setTask(newTask)
  }



  return pug`
    Navlink
    View.body
      Todoform(addTask=addTask)
      Todolist(
        task = task 
        saveEditedTask = saveEditedTask 
        closeTask = closeTask 
        deleteTask = deleteTask 
        openTask = openTask
        edit = edit
        changeEditStatus = changeEditStatus
        newEditValue = newEditValue
        setNewEditValue = setNewEditValue
      )


  `
})

