import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import store from '../store';

test('check for user object in global state', () => {
    const user = store.getState().user;
    expect(user).toBeDefined();
});