import { findAllBadges } from '../calculateBadges';

test('runs findAllBadges successfully', async () => {
    const j = await findAllBadges();
    
    expect(j).toBeGreaterThanOrEqual(104);
});