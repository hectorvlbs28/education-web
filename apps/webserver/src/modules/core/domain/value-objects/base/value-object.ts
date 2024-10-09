interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly _props: T;

  constructor(props: T) {
    this._props = Object.freeze(props);
  }
  abstract toValue(): unknown;

  abstract toJSON(): T;

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.toValue() === undefined) {
      return false;
    }
    return this.toValue() === vo.toValue();
  }
}
