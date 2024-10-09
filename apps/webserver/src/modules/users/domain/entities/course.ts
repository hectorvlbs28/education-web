import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IResponseCourseToJson } from '../interfaces/payload-course-create-domain.interface';
import { Attachment } from './attachment';
import { Contract } from './contract';

export class Course extends Entity {
  private _name: string;
  private _description: string;
  private _contracts: Contract[];
  private _attachments: Attachment[];

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IResponseCourseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      description: this._description,
      contracts:
        this._contracts && this._contracts.map((contract) => contract.toJSON()),
      attachments:
        this._attachments && this._attachments.map((att) => att.toJSON()),
      createdAt: this._createdAt,
    };
  }

  static hydrate(root: Partial<IResponseCourseToJson>): Course {
    const course = new Course(new Identifier(root.id));
    course._name = root.name;
    course._description = root.description;
    course._createdAt = root.createdAt;
    course._contracts =
      root.contracts &&
      root.contracts.map((contract) => Contract.hydrate(contract));
    course._attachments =
      root.attachments &&
      root.attachments.map((att) => Attachment.hydrate(att));
    return course;
  }
}
