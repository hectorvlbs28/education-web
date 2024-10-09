import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SignNowType } from '../../../config/types/signnow.type';
import { ISignNowService } from '../../domain/interfaces/docusign-service.interface';
import {
  IPayloadCreateDocument,
  IPayloadDataDocument,
} from '../../domain/interfaces/payload-create-document.interface';
import { IPayloadSendInviteSignature } from '../../domain/interfaces/payload-send-invite-signature.interface';
import { IDocumentData } from '../../domain/interfaces/document-response-data.interface';

@Injectable()
export class SignNowService implements ISignNowService {
  private readonly apiBaseUrl: string;
  private accessToken: string;
  constructor(private readonly config: ConfigService) {
    this.apiBaseUrl = this.config.get<SignNowType>('signNow').baseUrl;
  }

  public async getAccessToken(): Promise<string> {
    const url = `${this.apiBaseUrl}/oauth2/token`;
    const { clientId, clientSecret, password, userName } =
      this.config.get<SignNowType>('signNow');
    const data = {
      grant_type: 'password',
      username: userName,
      password,
      client_id: clientId,
      client_secret: clientSecret,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${data.client_id}:${data.client_secret}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  public async prefillDocumentFields(
    documentId: string,
    fields: IPayloadDataDocument
  ): Promise<any> {
    const templateId = await this.createTemplate(documentId);
    const url = `${this.apiBaseUrl}/document/${templateId}`;
    const payload = this.payloadContract(fields);
    try {
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to prefill document fields: ${error.message}`);
    }
  }

  public async getUrlDocument(documentId: string) {
    try {
      const url = `${this.apiBaseUrl}/document/${documentId}/download/link`;
      const response = await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.link;
    } catch (error) {
      throw new Error(`Failed to getting document: ${error.message}`);
    }
  }

  public async signDocument(documentId: string): Promise<any> {
    try {
      const url = `${this.apiBaseUrl}/link/`;
      const fields = { document_id: documentId };
      const response = await axios.post(url, fields, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to getting document: ${error.message}`);
    }
  }

  public async createTemplate(documentId: string): Promise<string> {
    const payload = {
      document_name: 'Contracto Ifashion',
      document_id: documentId,
    };
    const url = `${this.apiBaseUrl}/template`;
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.id;
    } catch (error) {
      throw new Error(`Failed to prefill document fields: ${error.message}`);
    }
  }

  private payloadContract(
    fields: IPayloadDataDocument
  ): IPayloadCreateDocument {
    const {
      fullName,
      schoolName,
      dateBirthStudent,
      curp,
      address,
      phone,
      scholarship,
      startDateService,
      modality,
      createdAt,
    } = fields;
    const payload: IPayloadCreateDocument = {
      document_name: 'contrato de la especialidad de diseño de modas',
      texts: [
        {
          page_number: 0,
          data: fullName,
          x: 86,
          y: 297,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 0,
          data: schoolName,
          x: 86,
          y: 314,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: dateBirthStudent,
          x: 255,
          y: 155,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: curp,
          x: 82,
          y: 170,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: address,
          x: 348,
          y: 170,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: phone,
          x: 203,
          y: 185,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: scholarship,
          x: 277,
          y: 202,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: startDateService,
          x: 121,
          y: 316,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 1,
          data: modality,
          x: 269,
          y: 316,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 17,
          data: createdAt,
          x: 233,
          y: 590,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
        {
          page_number: 17,
          data: fullName,
          x: 257,
          y: 654,
          font: 'Arial',
          line_height: 12,
          size: 10,
        },
      ],
    };
    return payload;
  }

  public async sendInviteSignature(
    documentId: string,
    data: IPayloadDataDocument
  ) {
    const documentIdByTemplate = await this.getCopyTemplate(documentId);
    const url = `${this.apiBaseUrl}/document/${documentIdByTemplate}/invite`;
    const payload = this.payloadSendInviteToSignature(
      documentIdByTemplate,
      data
    );
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return { ...response.data, documentIdByTemplate };
    } catch (error) {
      console.log(error.data);
      throw new Error(`Failed to send invite signature: ${error.message}`);
    }
  }

  private payloadSendInviteToSignature(documentId: string, data: any) {
    const { userName } = this.config.get<SignNowType>('signNow');
    const payload: IPayloadSendInviteSignature = {
      cc: [],
      document_id: documentId,
      from: userName,
      message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
      on_complete: 'document_and_attachments',
      subject:
        'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
      to: [
        {
          role: 'Destinatario 2',
          order: 1,
          message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
          subject:
            'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
          email: data.email,
          role_id: data.roleId,
          expiration_days: 30,
          reminder: {
            remind_before: 0,
            remind_after: 0,
            remind_repeat: 0,
          },
          authentication: {
            type: null,
          },
          reassign: '0',
          decline_by_signature: '0',
        },
      ],
      cc_step: [],
      document_name: 'contrato de la especialidad de diseño de modas',
      client_timestamp: 1722273409,
      template: true,
      viewers: [
        {
          message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
          subject:
            'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
          email: `${userName}`,
          role: 'You',
          order: 2,
        },
      ],
    };
    return payload;
  }

  public async getRoleIdByDocumentId(documentId: string): Promise<string> {
    try {
      const url = `${this.apiBaseUrl}/document/${documentId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.routing_details[0].data[0].role_id;
    } catch (error) {
      throw new Error(`Failed to getting document: ${error.message}`);
    }
  }

  public async getDocumentById(documentId: string): Promise<IDocumentData> {
    try {
      const url = `${this.apiBaseUrl}/document/${documentId}`;
      const response = await axios.get<IDocumentData>(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to getting document: ${error.message}`);
    }
  }

  public async getCopyTemplate(templateId: string): Promise<string> {
    const url = `${this.apiBaseUrl}/template/${templateId}/copy`;
    const payload = {
      document_name: 'Document-contract-ifashion',
    };
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.id;
    } catch (error) {
      console.log(error.data);
      throw new Error(`Failed to send: ${error.message}`);
    }
  }

  async onModuleInit() {
    this.accessToken = await this.getAccessToken();
  }
}
