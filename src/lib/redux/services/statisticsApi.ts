import baseApi from "./baseApi";

const StatisticsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        GetComplaintStatitistics: builder.query<any,string>({
            query:(userId:string)=>`/Statistics/GetComplaintStatistics?UserId=${userId}`
        }),

        GetComplaintLogStatistics: builder.query<any, { subordinateId: string, managerId: string }>({
            query: ({ subordinateId, managerId }) => ({
                url: `/Statistics/GetComplaintLogStatistics?ManagerId=${managerId}&SubordinateId=${subordinateId}`,
                method: "GET"
            })
        }),

        GetCorruptionTrendStatistics : builder.query({
            query:() => `/Statistics/GetCorruptionTrends`
        }) 

        
    })
})

export default StatisticsApi;