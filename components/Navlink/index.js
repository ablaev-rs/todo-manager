import React from 'react'
import { Text, View } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

export default observer(function Navlink () {


return pug`
    View.container
    	Text.header Task Manager
`

})
