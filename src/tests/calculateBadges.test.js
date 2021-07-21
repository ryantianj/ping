import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import { findAllBadges } from '../calculateBadges';

test('runs findAllBadges successfully', async () => {
    const j = await findAllBadges();
    expect(j).toBeGreaterThanOrEqual(104);
});