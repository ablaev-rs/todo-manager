import React, { useState } from 'react';
import { TouchableOpacity, Text, View, TextInput, Button, Alert } from 'react-native'
import { observer, useModel } from 'startupjs'
import './index.styl'

export default observer(function Todoform ({ addTask }) {

const [value, setValue] = useState('');

function enterTaskHandler() {
    addTask(value)
    setValue('')
}

return pug`
    View.container
        TextInput.field(placeholder = "Enter task" value = value onChangeText = setValue )
        Button(title="Add Task" onPress = enterTaskHandler)
            

`

})
