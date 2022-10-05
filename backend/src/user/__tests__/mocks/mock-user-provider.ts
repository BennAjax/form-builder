import { faker } from '@faker-js/faker';
import { UserModel } from '../../gateways/mongoose/user-schema';
import MockProviderBase from '../../../__tests__/mocks/mock-provider-base';

const getDefaultFunc = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.fullName(),
});

class MockUserProvider extends MockProviderBase {
  constructor() {
    super(UserModel, getDefaultFunc);
  }
}

export default new MockUserProvider();
