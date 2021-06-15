import React, { useEffect, useState} from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import firebase, {
    channelsCollection,
} from "../../../../../api/firebase";
import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../../styling/screens/In_App/app/channels/ChannelRoomScreen.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [posts, setPosts] = useState([])


    const upVote = (item) => {
        if (item.upVotes.includes(store.getState().user.user.uid)) {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayRemove(store.getState().user.user.uid)
            })
        } else {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayUnion(store.getState().user.user.uid)
            })
        }
    }

    useEffect(() => {
        const postListener = channelsCollection.doc(store.getState().room.room.roomid)
            .collection("Posts").orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const posts = snapshot.docs.map(doc => {
                    const docId = doc.id
                    const firebase = doc.data()
                    const data = {
                        _id: docId,
                        title: firebase.title,
                        text: firebase.content,
                        upVotes: firebase.likedby,
                        user: firebase.user,
                    }
                    return data;
                })
                setPosts(posts);
            })
        return () => postListener();
    }, [])


    const renderItem = ({item}) => {
        return (
            <View style = {styles.post}>
                <Text style = {styles.user}>
                    {item.user.display} posted:
                </Text>
                <Text style = {styles.postTitle}>
                    {item.title}
                </Text>
                <Text style = {styles.postText}>
                    {item.text}
                </Text>
                <View style = {styles.commentUpVote}>
                    <TouchableOpacity style = {styles.postComments}
                    onPress={() => prop.navigation.navigate("Comments", {})}>
                        <Text style = {styles.postCommentsText}>
                            ? comments
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.postUpVotes}
                    onPress={() => upVote(item)}
                    >
                        <Text style = {styles.postUpVotesText}>
                            {item.upVotes.length} upvotes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }


    return (
        <Screen style = {styles.container}>
            <View style = {styles.toolBar}>
                <TouchableOpacity
                    style = {styles.touchable1}
                    onPress = {() => prop.navigation.navigate("ChannelSettings")}
                >
                    <Ionicons style = {styles.icon}
                              name={'settings-outline'} size={35}  />
                </TouchableOpacity>


                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => prop.navigation.navigate("NewPost")}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>

            <Text
                style = {styles.chatsText}>
                {store.getState().room.room.roomname}
            </Text>


            <View style = {styles.flatList}>
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    extraData={posts}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    />
            </View>
        </Screen>
    )
}