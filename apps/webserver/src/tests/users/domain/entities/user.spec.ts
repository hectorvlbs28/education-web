import { User } from '../../../../modules/users/domain/entities/user';
import { Identifier } from '../../../../modules/core/domain/value-objects/identifier';

describe('Domain User UTest', () => {
  const user = User.create({
    id: new Identifier('USR_2i1Zn5yv12Ic4SeuSmI477VNH8W'),
    name: 'test-name',
    email: 'test-email@test.com',
    password: 'sywidxmn2344',
    roles: [],
  });

  it('Validate instance of User', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('Validate toJSON data user', () => {
    const { id, email, name, createdAt } = user.toJSON();
    expect(id).not.toBeNull();
    expect(typeof name).toBe('string');
    expect(typeof email).toBe('string');
    expect(createdAt).toBeInstanceOf(Date);
  });
});
