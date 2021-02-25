import invitees from './invitees';

test('Number of invitees', () => {
  let count = 0;

  for (const prop in invitees) {
    const invitee = invitees[prop];
    count ++;
    count += invitee.others.length;
  }

  expect(count).toBe(163);
});
