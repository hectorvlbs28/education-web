import { CoreErrorKeys } from '../enums/exception-keys.enum';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { ValueObject } from './base/value-object';

interface EmailObjectProps {
  email: string;
}

export class Email extends ValueObject<EmailObjectProps> {
  constructor(props: EmailObjectProps) {
    super(props);
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!expression.test(props.email)) {
      throw new InvalidEmailException(CoreErrorKeys.INVALID_EMAIL);
    }
  }

  public toValue(): string {
    return this._props.email;
  }

  public toJSON(): EmailObjectProps {
    return {
      email: this._props.email,
    };
  }

  public address(): string {
    return this._props.email.split('@')[0];
  }

  public domain(): string {
    return this._props.email.split('@')[1];
  }
}
