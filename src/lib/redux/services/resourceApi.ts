import baseApi from "./baseApi";
import { CreateResourceInput } from "@/types";

const ResoureApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        GetResourceById: builder.query<any,string>({
            query:(resourceId:string)=>`/Resource/GetResourceById?ResourceId=${resourceId}`
        }),

        GetAllResources: builder.query<any,{pageNumber:any,pageSize:any}>({
            query: ({pageNumber, pageSize}) => ({
              url:`/Resource/GetAllResources?PageNumber=${pageNumber}&PageSize=${pageSize}`
            })
        }),

        CreateResource : builder.query<any, CreateResourceInput>({
            query:(createResource:CreateResourceInput) =>({
                url: `/Resource/CreateResource`,
                method:"POST",
                body:createResource
            })
        })
    }) 

        
});

export default ResoureApi;