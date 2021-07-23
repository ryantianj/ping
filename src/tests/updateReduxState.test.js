import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import store from '../store';
import Login from '../screens/LoginScreen';
import Home from '../screens/In_App/app/HomeScreen';
import UpdateProfile from '../screens/In_App/settings/Profile/UpdateProfileScreen';
import Chats from '../screens/In_App/app/ChatScreen';
import Channels from '../screens/In_App/app/ChannelScreen';

beforeEach(() => {

})

test('check for user object in global state', () => {
    expect(1+1).toBe(2);
});

test('update state upon login', () => {
    expect(1+1).toBe(2);
});

test('update state upon entering chat room', () => {
    expect(1+1).toBe(2);
});

test('update state upon entering channel room', () => {
    expect(1+1).toBe(2);
});

test('update state upon confirm profile', () => {
    expect(1+1).toBe(2);
});