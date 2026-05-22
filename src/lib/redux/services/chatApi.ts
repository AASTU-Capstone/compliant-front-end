import baseApi from "./baseApi";

const ChatApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        GetChat: builder.query<any,string>({
            query:(message:string)=>`/Chat/MessageChat?message=${message}`
        }),
    })
})

export default ChatApi;