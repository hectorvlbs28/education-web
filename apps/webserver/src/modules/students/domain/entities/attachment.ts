import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import {
  IAttachment,
  IAttachmentToJson,
} from '../interfaces/attachment.interface';

export class Attachment extends Entity {
  private _mediaType: string;
  private _fileName: string;
  private _name: string;
  private _extension: string;
  private _documentType: string;

  constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IAttachmentToJson {
    return {
      id: this.id.toValue() && Number(this.id.toString()),
      mediaType: this._mediaType,
      fileName: this._fileName,
      name: this._name,
      extension: this._extension,
      documentType: this._documentType && this._documentType,
      createdAt: this._createdAt,
    };
  }

  static create(attachment: IAttachment): Attachment {
    const newDocument = new Attachment(new Identifier(attachment.id));

    newDocument._mediaType = attachment.mediaType;
    newDocument._fileName = attachment.fileName;
    newDocument._name = attachment.name;
    newDocument._extension = attachment.extension;
    newDocument._documentType = attachment.documentType;
    return newDocument;
  }

  static hydrate(root: any): Attachment {
    const document = new Attachment(new Identifier(root.id));
    document._mediaType = root.mediaType;
    document._fileName = root.fileName;
    document._name = root.name;
    document._extension = root.extension;
    document._documentType = root.documentType && root.documentType;
    document._createdAt = root.createdAt;
    return document;
  }
}
