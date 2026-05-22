import { 
  GetComplaintsResponse, 
  UpdateComplaintLogStatusForSubordinate,
  updateComplaintLogReport } 
  from "@/types";
import baseApi from "./baseApi";

const subordinateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        GetComplaintLogsToUpdateForSubordinate: builder.query<any,{pageNumber:any,pageSize:any}>({
          query: ({pageNumber, pageSize}) => ({
            url:`/Subordinate/GetComplaintLogsToUpdate?PageNumber=${pageNumber}&PageSize=${pageSize}`,
            method:"GET"
          })
          }),

        GetComplaintLogById : builder.query<any, string>({
          query:(complaintLogId:string)=> `/ComplaintLog/GetComplaintLogById?ComplaintLogId=${complaintLogId}`,
        }),

        GetSubordinateProfile : builder.query({
          query:()=> `/Subordinate/GetProfile`
        }),

        UpdateComplaintLogStatusForSubordinate : builder.mutation<any, UpdateComplaintLogStatusForSubordinate>({
          query:(complaintLog:UpdateComplaintLogStatusForSubordinate)=>({
            url : `/Subordinate/UpdateComplaintLogStatus`,
            method:"PATCH",
            body:complaintLog
          }),
        }),

        UpdateComplaintLogReportForSubordinate : builder.mutation<any, updateComplaintLogReport>({
          query:(complaintLogReport:updateComplaintLogReport)=>({
            url:`/Subordinate/UpdateComplaintLog`,
            method:"PATCH",
            body:complaintLogReport
          }),
        }),
        

        }),
})

export default subordinateApi;