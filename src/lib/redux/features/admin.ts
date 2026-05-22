import AdminApi from "../services/adminApi";
export const {
    useGetComplaintLogsToUpdateForAdminQuery,
    useGetRecievedComplaintsForAdminQuery,
    useGetAcceptedComplaintsForAdminQuery,
    useGetManagersForAdminQuery,
    useGetAllComplaintsForAdminQuery,
    useAssignManagerForAdminMutation,
    useAddManagerForAdminMutation,
    useGetComplaintByIdForAdminQuery,
    useUpdateComplaintLogStatusForAdminMutation,
    useUpdateComplaintStatusForAdminMutation,
    useGetAdminProfileQuery,
    useUpdateManagerForAdminMutation,
    useSearchComplaintsQuery
} = AdminApi;