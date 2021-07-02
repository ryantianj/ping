import { findAllBadges } from './calculateBadges';
import store from './store';
import { render, fireEvent } from '@testing-library/jest-native';

// Backend
test('runs findAllBadges successfully', async () => {
    const j = await findAllBadges();
    expect(j).toBeGreaterThanOrEqual(104);
});

test('is user defined?', () => {
    const user = store.getState().user;
    expect(user).toBeDefined();
});