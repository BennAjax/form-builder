import { fromPairs, merge } from 'lodash';

export default abstract class MockProviderBase {
  public T;

  public getDefault;

  protected constructor(T: any, getDefault: () => {}) {
    this.T = T;
    this.getDefault = getDefault;
  }

  createOne(overrides = {}) {
    const newMock = new this.T({ ...this.getDefault() });
    return merge(newMock, overrides);
  }

  createMany(length = 1, overridesArray: any[] = []) {
    // @ts-ignore
    return Array.from({ length }).map((x, i) => this.createOne({ ...overridesArray[i] }));
  }

  createManyFromArray(array: any, mappings = [['user', '_id']], overridesArray: any[] = []) {
    return array.map((a: any, i: any) => {
      // @ts-ignore
      return this.createOne({ ...fromPairs(mappings.map(m => [m[0], a[m[1]]])), ...overridesArray[i] });
    });
  }
}
