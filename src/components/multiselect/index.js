import React, { useContext } from "react";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { AuthContext } from "../../Context/Auth";




const Index = (props)=>{
    
    const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

    return(
        <SelectBox
                    label=""
                    options={props.workspaceUsers}
                    selectedValues={props.selectedTeams}
                    onMultiSelect={props.onMultiChange}
                    onTapClose={props.onTapClose}
                    isMulti
                    toggleIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    searchIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    arrowIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    multiListEmptyLabelStyle={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}
                    listEmptyLabelStyle={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 5 }}
                    inputFilterStyle={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}
                    optionContainerStyle={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}
                    selectedItemStyle={{ backgroundColor: "blue" }}
                    width="90%"
                />
    )
}


export default Index