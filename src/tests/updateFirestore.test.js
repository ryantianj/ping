import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import store from '../store';
import { usersCollection, roomsCollection, channelsCollection } from '../../api/firebase';
import Login from '../screens/LoginScreen';
import Search from '../constants/Search';
import UpdateProfile from '../screens/In_App/settings/Profile/UpdateProfileScreen';
import Chats from '../screens/In_App/app/ChatScreen';
import Groups from '../screens/In_App/app/GroupScreen';
import Channels from '../screens/In_App/app/ChannelScreen';

beforeEach(() => {
    // Login
    const { getByTestId } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'mchj2468@gmail.com');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'correctpw');
    fireEvent.press(getByTestId('Login.Button'));
})

test('send message in chat updates firestore', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Chats />);
    getByText('Your Chats');
    const chatButtons = getAllByA11yLabel('Chat.Button')
    fireEvent.press(chatButtons[0]);
    fireEvent.changeText(getByTestId('ChatRoom.msgInput'), 'test message');
    fireEvent.press(getByTestId('ChatRoom.Send'));

    currRoomId = store.getState().room.room.roomid;
    const response = await roomsCollection.doc(currRoomId).get();
    const firestoreData = response.data().latestMessage.text;

    expect(firestoreData).toEqual('test message');
});

test('make new post updates firestore', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Channels />);
    getByText('Your Channels');
    const channelButtons = getAllByA11yLabel('Channel.Button')
    fireEvent.press(channelButtons[0]);
    fireEvent.press(getByTestId('ChannelRoom.newPost'));
    fireEvent.changeText(getByTestId('ChannelNewPost.titleInput'), 'test title');
    fireEvent.changeText(getByTestId('ChannelNewPost.contentInput'), 'test content');
    fireEvent.press(getByTestId('ChannelNewPost.Create'));

    currRoomId = store.getState().room.room.roomid;
    const response = await channelsCollection.doc(currRoomId).get();
    const firestoreData = response.data().latestPost.text;

    expect(firestoreData).toEqual('test title');
});

test('create new group updates firestore', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Groups />);
    getByText('Your Groups');
    fireEvent.press(getByTestId('Group.createGroup'));
    fireEvent.changeText(getByTestId('CreateGroup.nameInput'), 'test group');
    const friends = getAllByA11yLabel('CreateGroup.friends')
    fireEvent.press(friends[0]);
    fireEvent.press(getByTestId('CreateGroup.createButton'));

    currRoomId = store.getState().room.room.roomid;
    const response = await roomsCollection.doc(currRoomId).get();
    const firestoreData = response.data();

    expect(firestoreData).toBeDefined;
});

test('update profile updates firestore', () => {
    const { getByTestId, getByText } = render(<UpdateProfile />);

    const newBio = 'this is my new bio';
    fireEvent.changeText(getByTestId('Update.bioInput'), newBio);

    getByText('Confirm Changes');
    fireEvent.press(getByTestId('Confirm.Button'));

    const uid = store.getState().user.user.uid;
    const response = await usersCollection.doc(uid).get();
    const firestoreData = response.data().bio;

    expect(firestoreData).toEquals(newBio);
});

test('search history updates firestore', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Search />);
    const uid = store.getState().user.user.uid;
    const response1 = await usersCollection.doc(uid).get();
    const searchHistCount1 = response1.data().searchHistory.length;
    fireEvent.changeText(getByTestId('Search.searchInput'), 'testing search');
    const SearchResElem = getAllByA11yLabel('Search.ResultButton');
    fireEvent.press(SearchResElem[0]);

    const response2 = await usersCollection.doc(uid).get();
    const searchHistCount2 = response2.data().searchHistory.length;
    
    expect(searchHistCount2).toBe(searchHistCount1 + 1);
});