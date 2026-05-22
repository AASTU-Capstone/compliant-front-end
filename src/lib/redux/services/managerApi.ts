import {
  CreateSubordinateInput,
  AssignSubordinateInput,
  UpdateComplaintLogStatusInput,
  DeleteSubordinateInput,
} from "@/types";
import baseApi from "./baseApi";
import { url } from 'inspector';

const managerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Subordinates
    GetSubordinates: builder.query<any,{pageNumber:any,pageSize:any}>({
      query: ({pageNumber, pageSize}) => ({
        url:`/Manager/GetSubordinates?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method:"GET"
      })
    }),

    GetManagerProfile : builder.query({
      query:()=> `/Manager/GetProfile`
    }),

    // Create Subordinate
    CreateSubordinate: builder.mutation<any, CreateSubordinateInput>({
      query: (credentials: CreateSubordinateInput) => ({
        url: "/Manager/CreateSubordinate",
        method: "POST",
        body: credentials,
      }),
    }),

    SearchSubordinates : builder.query<any, {keyword:string, pageNumber:any, pageSize:any}>({
      query:({keyword,pageNumber,pageSize})=>({
        url:`/Manager/SearchSubordinates?Keyword=${keyword}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method:"GET"
      })
    }),

    // Get Complaint Log To Assign For Manager
    GetComplaintLogToAssignForManager: builder.query<any,{pageNumber:any,pageSize:any}>({
      query: ({pageNumber, pageSize}) => ({
        url: `/Manager/GetComplaintLogToAssign?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        methdo:"GET"
      })
    }),

    // Get Complaint Log To Update For Manager
    GetComplaintLogToUpdateForManager: builder.query<any,{pageNumber:any,pageSize:any}>({
      query: ({pageNumber, pageSize}) => ({
        url: `/Manager/GetComplaintLogToUpdate?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method:"GET"
      })
    }),

    // Assign Subordinate
    AssignSubordinate: builder.mutation<any, AssignSubordinateInput>({
      query: (credentials: AssignSubordinateInput) => ({
        url: "/Manager/AssignSubordinate",
        method: "POST",
        body: credentials,
      }),
    }),

    // Update Complaint Log Status
    UpdateComplaintLogStatus: builder.mutation<
      any,
      UpdateComplaintLogStatusInput
    >({
      query: (input: UpdateComplaintLogStatusInput) => ({
        url: "/Manager/UpdateComplaintLogStatus",
        method: "PATCH",
        body: input,
      }),
    }),

    DeleteSubordinate : builder.mutation<any, DeleteSubordinateInput>({
      query:(deleteSubordinateInput:DeleteSubordinateInput) =>({
        url:`/Manager/DeleteSubordinate`,
        method:"DELETE",
        body:deleteSubordinateInput
      })
    })

    // SearchSubordinates: builder.query({
    //   query: (keyword) => `/Manager/SearchSubordinates?Keyword=${keyword}`,
    // }),
  }),
});

export default managerApi;
