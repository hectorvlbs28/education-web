import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IResponseCourseToJson } from '../interfaces/response-course-tojson.interface';
import { Contract } from './contract';

export class Course extends Entity {
  private _name: string;
  private _description: string;
  private _contract: Contract;

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IResponseCourseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      description: this._description,
      contract: this._contract && this._contract.toJSON(),
      createdAt: this._createdAt,
    };
  }

  static hydrate(root: Partial<IResponseCourseToJson>): Course {
    const course = new Course(new Identifier(root.id));
    course._name = root.name;
    course._description = root.description;
    course._createdAt = root.createdAt;
    course._contract = root.contract && Contract.hydrate(root.contract);
    return course;
  }
}
