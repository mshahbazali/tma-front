import React, { forwardRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddWorkspaceInput = forwardRef((props, ref) => {

    return (
        <View style={[styles.inputfield, props.style]}>

            <TextInput
                value={props.value}
                ref={ref}
                underlineColorAndroid="transparent"
                multiline={props.multiline}
                style={[styles.text, props.textStyle]}
                placeholder={props.placeholder}
                onChangeText={props.onChange}
                onChange={props.onChange}
                keyboardType={props.keyboardType}
                placeholderTextColor={props.placeholderTextColor}
                onSubmitEditing={props.onSubmitEditing}
                secureTextEntry={props.secureTextEntry}
                defaultValue={props.defaultValue}
                maxLength={props.maxLength}
                autoFocus={props.autoFocus}
                editable={props.editable}
                numberOfLines={props.numberOfLines}
                textAlignVertical={props.textAlignVertical}
            />
        </View>
    );
});
const styles = StyleSheet.create({
    text: { fontFamily: 'Poppins_500Medium', color: '#000000'  },
    inputfield:{
        marginVertical:10,
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 1, 
    }
});
export default AddWorkspaceInput;