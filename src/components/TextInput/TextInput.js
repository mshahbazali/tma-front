import React, { forwardRef , useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../Context/Auth';



const Inputfield = forwardRef((props, ref) => {
  const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

  return (
    <View style={[styles.inputfield, props.style]}>
      {props.password ?
        <View style={[{ flexDirection: 'row', marginTop: 45, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between' }, props.textField]}>
          <TextInput
            value={props.value}
            ref={ref}
            underlineColorAndroid="transparent"
            multiline={props.multiline}
            style={[props.textStyle, { fontFamily: 'Poppins_500Medium', paddingVertical: 20, padding: 10, width: props.warning ? '80%' : '90%' , color:darkMode ? customDarkMode.textColor :customLightMode.textColor }]}
            placeholder={props.placeholder}
            onChangeText={props.onChange}
            onChange={props.onChange}
            keyboardType={props.keyboardType}
            placeholderTextColor={'gray'}
            onSubmitEditing={props.onSubmitEditing}
            secureTextEntry={!props.secureTextEntry}
            defaultValue={props.defaultValue}
            maxLength={props.maxLength}
            autoFocus={props.autoFocus}
            editable={props.editable}
            numberOfLines={props.numberOfLines}
            textAlignVertical={props.textAlignVertical}
            
          />
          {props.warning &&
            <Entypo name="warning" size={20} color="red" />
          }

          {props.toggleEye === false ? null : !props.secureTextEntry ? <TouchableOpacity onPress={props.eyePress}>
            <Ionicons name="eye" size={23} color={darkMode ? customDarkMode.textColor : customLightMode.textColor}/>
          </TouchableOpacity> :
            <TouchableOpacity onPress={props.eyePress}>
              <Ionicons name="eye-off" size={23} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
            </TouchableOpacity>}

        </View>
        :
        <TextInput
          value={props.value}
          ref={ref}
          underlineColorAndroid="transparent"
          multiline={props.multiline}
          style={[styles.text, props.textStyle,{color:darkMode ? customDarkMode.textColor :customLightMode.textColor}]}
          placeholder={props.placeholder}
          onChangeText={props.onChange}
          onChange={props.onChange}
          keyboardType={props.keyboardType}
          placeholderTextColor={'gray'}
          onSubmitEditing={props.onSubmitEditing}
          secureTextEntry={props.secureTextEntry}
          defaultValue={props.defaultValue}
          maxLength={props.maxLength}
          autoFocus={props.autoFocus}
          editable={props.editable}
          numberOfLines={props.numberOfLines}
          textAlignVertical={props.textAlignVertical}
        />
      }
    </View>
  );
});
const styles = StyleSheet.create({
  text: { fontFamily: 'Poppins_500Medium', color: '#000000', marginTop: 45, marginHorizontal: 20, paddingVertical: 20, padding: 10 },
});
export default Inputfield;