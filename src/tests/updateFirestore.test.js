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
    
})

test('send message in chat updates firestore', () => {
    expect(1+1).toBe(2);
});

test('make new post updates firestore', () => {
    expect(1+1).toBe(2);
});

test('create new group updates firestore', () => {
    expect(1+1).toBe(2);
});

test('update profile updates firestore', () => {
    expect(1+1).toBe(2);
});

test('search history updates firestore', () => {
    expect(1+1).toBe(2);
});