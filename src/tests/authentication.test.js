import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import Login from '../screens/LoginScreen';

test('renders login screen elements', () => {
    const { getAllByText, getByPlaceholderText } = render(<Login />);
    expect(getAllByText('Log In').length).toBe(1);
    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
});

test('shows error messages for invalid email input', () => {
    const { getByTestId, getByText } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'thisisaninvalidemail');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'aaaaaa');
    fireEvent.press(getByTestId('Login.Button'));

    getByText('Please enter a valid email address');
});

test('shows error messages for wrong password', () => {
    const { getByTestId, getByText } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'mchj2468@gmail.com');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'wrongpw');
    fireEvent.press(getByTestId('Login.Button'));

    getByText('Please retry with the correct password');
});

test('authenticate valid credentials, navigate to home screen', () => {
    const { getByTestId, getByText } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'mchj2468@gmail.com');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'correctpw');
    fireEvent.press(getByTestId('Login.Button'));

    getByText('Your Notifications');
    getByText('Search');
});











//////////////////////////////////////
test('math', () => {
    expect(1+1).toBe(2);
});