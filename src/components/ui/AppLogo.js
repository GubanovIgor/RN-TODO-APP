import React from 'react'
import {} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

export const AppLogo = ({color = '#fff', size = 20, name}) => {
  return (
    <AntDesign color={color} size={size} name={name}/>
  )
}