import { MarkNotificationInput } from "@/types";
import baseApi from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    MarkNotifications: builder.mutation<any, MarkNotificationInput>({
        query: (IDs: MarkNotificationInput) => ({
            url: "/Notification/MarkNotificationsToRead",
            method: "POST",
            body: IDs,
        })
    }),
    
    GetUnreadNotifications: builder.query({
        query: () => "/Notification/GetUnreadNotifications"
    })
  })
})

export default notificationApi;