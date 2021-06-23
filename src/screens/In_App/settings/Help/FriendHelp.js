import React  from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/FriendHelp.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.headerText}>
                Friends
            </Text>

            <Text style = {styles.bodyText}>
                P!ng allows you to have meaningful interactions with new people. The Friends feature 
                is our way of helping you keep track of these bonds so that you can ping them again 
                anytime!
                {"\n\n"}
                If you would like to befriend another user, you may add them by searching them 
                up in the Searchbar. This can be done with their display name or email. 
                If the user is private, you will have to wait for him/her to accept your friend request. 
                This can be done at Settings -{'>'} Friends -{'>'} Pending Requests. 
                {"\n\n"}
                Once you are friends with another user, you may add them in chats, groups and even view 
                their badges! Of course, you can also remove any user as your friend by viewing their 
                profile at Settings -{'>'} Friends.
            </Text>
            
        </Screen>
    )
}