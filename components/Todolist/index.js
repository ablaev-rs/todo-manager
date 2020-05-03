import React, { useState } from 'react'
import { TouchableOpacity, Text, View, TextInput, ScrollView } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

export default observer(function Todolist ({ task, newEditValue, setNewEditValue, edit, changeEditStatus, saveEditedTask, closeTask, deleteTask, openTask }) {
  
  const [taskFilter, setTaskFilter] = useState({
    active: false,
    type: 'open'
  })

  function getTasks () {
    if (taskFilter.active === true) {
      return task.filter(el => el.status === taskFilter.type)
    }
    return task
  }

  function setCloseTaskHandler () {
    setTaskFilter({
      active: true,
      type: 'close'
    })
  }

  function setOpenTaskHandler () {
    setTaskFilter({
      active: true,
      type: 'open'
    })
  }

  function setAllTaskHandler () {
    setTaskFilter({ active: false })
  }



  return pug`
     
    View.filter
        Text.filterText Filter:
        TouchableOpacity(onPress = setAllTaskHandler)
            Text.filterText All
        TouchableOpacity(onPress = setOpenTaskHandler)
            Text.filterText Open
        TouchableOpacity(onPress = setCloseTaskHandler)
            Text.filterText Close
     
    ScrollView.taskBlock
        each todo in getTasks()
            View.tasklist

                if edit.editStatus && edit.id === todo.id  
                    TextInput.field(value = newEditValue onChangeText = setNewEditValue )
                else
                    if todo.status === "close"
                      Text.taskHeaderClose= todo.name
                    else 
                      Text.taskHeader= todo.name

                View.taskButtons

                  if edit.editStatus && edit.id === todo.id
                    TouchableOpacity.btn(onPress = () => saveEditedTask(todo.id, newEditValue))
                        Text.saveBtn.btn Save
                  else

                    if todo.status === "open"
                        TouchableOpacity.btn(onPress = () => closeTask(todo.id))
                            Text.closeBtn.btn Close
                    else
                        TouchableOpacity.btn(onPress = () => openTask(todo.id))
                            Text.openBtn.btn Open

                    TouchableOpacity(onPress = () => changeEditStatus(todo.id, true, todo.name) )
                        Text.editBtn.btn Edit

                    TouchableOpacity.btn(onPress = () => deleteTask(todo.id))
                        Text.deleteBtn.btn Delete
        
          

`
})
