import baseApi from "./baseApi";
const ComplaintLogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        GetComplaintLogById : builder.query<any, string>({
            query:(complaintLogId:string)=> `/ComplaintLog/GetComplaintLogById?ComplaintLogId=${complaintLogId}`,
          }),

        SearchComplaintLog : builder.query<any, {keyword:string,status:string,pageNumber:any,pageSize:any}>({
            query:({keyword,status,pageNumber,pageSize})=>({
                url:`/ComplaintLog/SearchComplaintLogs?keyword=${keyword}&status=${status}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
                method:"GET"
            })
        }),
    })
})

export default ComplaintLogApi