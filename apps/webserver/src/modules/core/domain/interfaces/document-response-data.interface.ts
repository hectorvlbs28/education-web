export interface IDocumentData {
  id: string;
  parent_id: string;
  user_id: string;
  document_name: string;
  page_count: string;
  created: string;
  updated: string;
  original_filename: string;
  origin_document_id: string;
  owner: string;
  owner_name: string;
  template: boolean;
  origin_user_id: string;
  version_time: string;
  thumbnail: Thumbnail;
  roles: Role[];
  viewer_roles: Role[];
  approver_roles: any[];
  attachments: any[];
  checks: any[];
  document_group_info: DocumentGroupInfo;
  document_group_template_info: any[];
  integrations: any[];
  settings: { [key: string]: boolean };
  signing_session_settings: SigningSessionSettings;
  tags: Tag[];
  enumeration_options: any[];
  exported_to: any[];
  fields: Field[];
  field_invites: FieldInvite[];
  viewer_field_invites: ViewerFieldInvite[];
  approver_field_invites: any[];
  field_validators: any[];
  hyperlinks: any[];
  inserts: any[];
  notary_invites: any[];
  originator_organization_settings: any[];
  payments: any[];
  radiobuttons: any[];
  seals: any[];
  signatures: Signature[];
  requests: any[];
  routing_details: RoutingDetail[];
  texts: any[];
  originator_logo: string;
  pages: Page[];
  lines: any[];
  share_info: ShareInfo;
}

export interface DocumentGroupInfo {
  document_group_id: string;
  document_group_name: string;
  invite_id: string;
  invite_status: string;
  sign_as_merged: boolean;
  doc_count_in_group: number;
  freeform_invite: FreeformInvite;
  state: any;
}

export interface FreeformInvite {
  id: string;
}

export interface FieldInvite {
  id: string;
  signer_user_id: string;
  signer_phone_invite: string;
  status: string;
  password_protected: string;
  password_type: string;
  password_method: string;
  reassign: string;
  pfrmerchant_account_name: string;
  created: string;
  role: string;
  reminder: string;
  updated: string;
  expiration_time: string;
  email: string;
  role_id: string;
  redirect_uri: string;
  is_draft_exists: string;
  is_full_declined: boolean;
  is_embedded: boolean;
  declined: any[];
  required_preset_signature_name: any;
  decline_by_signature: string;
  electronic_consent_required: number;
  email_group: EmailGroup;
  payment_request: any;
  delivery_type: string;
  email_statuses: EmailStatus[];
  pfrid: string;
  pfrtype: any;
  pfrmerchant_id: string;
  pfrstatus: string;
  pframount: number;
  pfrpayment_transaction_id: string;
  pfrcreated: Date;
  pfrmerchant_type: string;
  pfrcurrency_name: string;
  pfrjson_attributes: string;
  id_verification_required: string;
  id_verified: string;
  electronic_consent_id: string;
  stripe_ach_bank_account_verified: string;
  stripe_ach_bank_account_present: string;
  decline_redirect_uri: string;
  close_redirect_uri: string;
  redirect_target: string;
  embedded_signer: any[];
  prefill_signature_name: string;
  force_new_signature: string;
  signing_instructions: string;
  signature_type: string;
  language: string;
  is_document_locked: string;
}

export interface EmailGroup {
  id: string;
  name: string;
}

export interface EmailStatus {
  status: string;
  created_at: number;
  last_reaction_at: number;
}

export interface Field {
  id: string;
  type: string;
  role_id: string;
  json_attributes: JSONAttributes;
  role: string;
  originator: string;
  fulfiller: string;
  field_request_id: string;
  element_id: string;
  field_request_canceled: null;
  template_field_id: string;
  field_id: string;
}

export interface JSONAttributes {
  page_number: number;
  x: number;
  y: number;
  width: number;
  height: number;
  required: boolean;
  name: string;
  allowed_types: string[];
}

export interface Page {
  src: string;
  size: Size;
}

export interface Size {
  width: number;
  height: number;
}

export interface Role {
  unique_id: string;
  signing_order: string;
  name: string;
}

export interface RoutingDetail {
  id: string;
  data: Datum[];
  created: string;
  updated: string;
  cc: any[];
  cc_step: any[];
  invite_link_instructions: string;
  viewers: Viewer[];
  approvers: any[];
}

export interface Datum {
  default_email: string;
  inviter_role: boolean;
  decline_by_signature: boolean;
  role_id: string;
  name: string;
  signing_order: number;
}

export interface Viewer {
  default_email: string;
  name: string;
  signing_order: number;
  inviter_role: boolean;
}

export interface ShareInfo {
  is_team_shared: boolean;
}

export interface Signature {
  id: string;
  user_id: string;
  signature_request_id: string;
  email: string;
  page_number: string;
  width: string;
  height: string;
  x: string;
  y: string;
  created: string;
  subtype: string;
  signing_reason: string;
  first_name: string;
  last_name: string;
  allow_editing: boolean;
  owner_as_recipient: string;
  data: string;
}

export interface SigningSessionSettings {
  welcome_message: string;
}

export interface Tag {
  type: string;
  name: string;
}

export interface Thumbnail {
  small: string;
  medium: string;
  large: string;
}

export interface ViewerFieldInvite {
  id: string;
  signer_user_id: string;
  status: string;
  created: string;
  role: string;
  updated: string;
  email: string;
  role_id: string;
  close_redirect_uri: string;
  redirect_target: string;
  email_group: EmailGroup;
  email_statuses: EmailStatus[];
}
