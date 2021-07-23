import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import store from '../store';
import Login from '../screens/LoginScreen';
import Home from '../screens/In_App/app/HomeScreen';
import UpdateProfile from '../screens/In_App/settings/Profile/UpdateProfileScreen';
import Chats from '../screens/In_App/app/ChatScreen';
import Channels from '../screens/In_App/app/ChannelScreen';

beforeEach(() => {
    // Login
    const { getByTestId } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'mchj2468@gmail.com');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'correctpw');
    fireEvent.press(getByTestId('Login.Button'));
})

test('check for user object in global state', () => {
    const user = store.getState().user;
    expect(user).toBeDefined();
});

test('update state upon login', () => {
    const { getByText } = render(<Home />);

    getByText('Your Notifications');
    const user = store.getState().user.user;
    expect(user.email).toEqual('mchj2468@gmail.com');
});

test('update state upon entering chat room', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Chats />);

    getByText('Your Chats')
    const chatButtons = getAllByA11yLabel('Chat.Button')
    fireEvent.press(chatButtons[0]);

    const room = store.getState().room.room;
    expect(room.roomid).toBeDefined();
    expect(room.type).toBe(0);
});

test('update state upon entering channel room', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Channels />);

    getByText('Your Channels');
    const channelButtons = getAllByA11yLabel('Channel.Button')
    fireEvent.press(channelButtons[0]);

    const room = store.getState().room.room;
    expect(room.roomid).toBeDefined();
    expect(room.type).toBe(2);
});

test('update state upon confirm profile', () => {
    const { getByTestId, getByText } = render(<UpdateProfile />);

    const newBio = 'this is my new bio';
    fireEvent.changeText(getByTestId('Update.bioInput'), newBio);

    getByText('Confirm Changes');
    fireEvent.press(getByTestId('Confirm.Button'));

    const user = store.getState().user.user;
    expect(user.bio).toBe(newBio);
});