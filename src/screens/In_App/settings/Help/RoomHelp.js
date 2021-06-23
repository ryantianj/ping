import React  from "react";
import {Text, TouchableOpacity, ScrollView} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/RoomHelp.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
            <Text style = {styles.headerText}>
                Rooms
            </Text>

            <Text style = {styles.bodyText}>
               The main selling point of P!ng is its scalability, providing users with the freedom to 
               interact on a variety of levels. 
               {"\n\n"}
               Our 3 levels of communication are detailed below:
            </Text>

            <Text style = {styles.subheaderText}>
                Chats
            </Text>

            <Text style = {styles.bodyText}>
                Chats are simplistic, protected rooms for two users to have a private conversation with 
                each other. Each chat is tagged to certain topics, acting as subjects for the users to 
                centre their conversations upon.
            </Text>

            <Text style = {styles.subheaderText}>
                Groups
            </Text>

            <Text style = {styles.bodyText}>
                Groups build on the functionalities of Chats, but help to facilitate discussions of 
                several like-minded users. You may create a group with any number of friends inside, and 
                any member in a Group is able to add his/her own friends to a Group room.
            </Text>

            <Text style = {styles.subheaderText}>
                Channels
            </Text>

            <Text style = {styles.bodyText}>
                Channels are like the marketplace for P!ng, where all users can gather for a specific 
                subject matter. Each channel is tagged to 1 or 2 topics, and any user can create a channel. 
                {"\n\n"}
                Channels are public by default, so any user can search and join your channel from the 
                Global Search. Any user is also free to create a post in a channel. Under each post, 
                users can leave comments related to the main post.
                {"\n\n"}
                For each post/comment, creators can receive upvotes from others in the channel. Upvotes 
                assist users in achieving topic-related badges, more of which is elaborated upon in the 
                Badges help section.
            </Text>
            </ScrollView>
        </Screen>
    )
}