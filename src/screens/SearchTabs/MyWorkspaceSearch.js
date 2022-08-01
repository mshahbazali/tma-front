import React from "react";
import { View } from "react-native";
import SearchHeader from '../../components/header/SearchHeader'

const MyWorkspaceSearch = () => {
    return (
        <View>
            <SearchHeader
                placeholderTextColor={colors.grey}
                placeholder="Search"
                onChange={(e) => setValue(e)}
                value={value}
                onPress={() => navigation.navigate('fulllist')}
            />
        </View>
    )
}



export default MyWorkspaceSearch;