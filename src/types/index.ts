import { FileWithPath } from "@mantine/dropzone";

/////////////////////////////////////////////////
/////////////////AUTH///////////////////////////
///////////////////////////////////////////////
export interface SignupCredentials {
  email: string;
  password: string;
  user_Type?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupApiResponse {
  id: string;
  message: string;
  success: boolean;
  error?: string[];
  statusCode: number;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  id: string;
  email: string;
  token: string;
  isVerified: boolean;
}

export interface verifyAccountInput {
  email: string;
  OTPCode: string;
}

export interface verifyAccontApiResponse {
  id: string;
  message: string;
  success: boolean;
  error?: string[];
}

export interface forgotpasswordotp {
  email: string;
}

export interface forgotpasswordotpApiResponse {
  id: string;
  message: string;
  statusCode: number;
  success: boolean;
  data?: string;
  error?: string[];
}

export interface resetPassword {
  newPassword: string;
  email: string;
}

export interface resetPasswordApiResponse {
  id: string;
  message: string;
  statusCode: number;
  success: boolean;
  data?: string;
  error?: string[];
}

export interface createOTPInput {
  email: string;
}

export interface createOTPApiResponse {
  id: string;
  message: string;
  success: boolean;
  error?: string[];
}

/////////////////////////////////////////////

////////////////////////////////////////////////////////////////
/////////////////////// COMPLAINTS /////////////////////////////
///////////////////////////////////////////////////////////////

export interface GetComplaintsResponse {
  id: string;
  message: string;
  statusCode: number;
  success: boolean;
  data?: string;
  error?: string[];
}

export interface GetComplaintsForUserResponse {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  category: string;
  feedback: string | null;
}

export interface CreateComplaintInput {
  Title: string;
  Category: string | null;
  Content: string;
  ImagesEvidence: FileWithPath[];
  SoundTrack: FileWithPath[];
  Videos: FileWithPath[];
  Documents: FileWithPath[];
}

/////////////////////////////////////////////

/////////////////////////////////////////////////////////////
/////////////////////// MANAGER /////////////////////////////
/////////////////////////////////////////////////////////////
export interface GetSubordinatesResponse {
  id: string;
  name: string;
  email: string;
  mitigatedCount: number;
}

export interface CreateSubordinateInput {
  name: string;
  email: string;
}

export interface GetComplaintLogToAssignForManagerResponse {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface GetComplaintLogToUpdateForManagerResponse {
  id: string;
  title: string;
  priority: string;
  subordinate: string;
  manager: string;
  createdAt: string;
}

export interface UpdateComplaintLogStatusInput {
  complaintLogId: string;
  status: string;
}

export interface DeleteSubordinateInput {
  id: string;
}

/////////////////////////////////////////////

///////////////////////////////////////////////////////
/////////////////////// ADMIN  ////////////////////////
//////////////////////////////////////////////////////
export interface AssignManagerInput {
  title: string;
  priority: string;
  managerId: string;
  complaintId: string;
}

export interface AddManagerInput {
  name: string;
  email: string;
  role: string | null;
}

export interface EditManagerInput {
  id: string;
  name: string;
  email: string;
}

export interface UpdateComplaintStatusInputForAdmin {
  complaintId: string;
  status: string;
  feedback: string | null;
}

export interface UpdateComplaintLogStatusInputForAdmin {
  complaintLogId: string;
  status: string;
}

export interface ManagerResponse {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}

/////////////////////////////////////////////

/////////////////////////////////////////////////////
//////////////////// SUBORDINATE ////////////////////
////////////////////////////////////////////////////
export interface AssignSubordinateInput {
  complaintLogId: string;
  subordinateId: string;
}

export interface UpdateComplaintLogStatusForSubordinate {
  complaintLogId: string;
  status: string;
}
export interface updateComplaintLogReport {
  id: string;
  report: string;
}

/////////////////////////////////////////////

/////////////////////////////////////////////////////
//////////////////// Resource //////////////////////
////////////////////////////////////////////////////

export interface CreateResourceInput {
  title: string;
  description: string;
}

///////////////////////////////////////////

////////////////////////////////////////////////////////
//////////////////// Notification //////////////////////
///////////////////////////////////////////////////////

export interface MarkNotificationInput {
  notificationIds: string[];
}
