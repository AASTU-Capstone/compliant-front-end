import subordinateApi from "../services/subordinateApi";
export const {
    useGetComplaintLogsToUpdateForSubordinateQuery,
    useGetComplaintLogByIdQuery,
    useUpdateComplaintLogStatusForSubordinateMutation,
    useUpdateComplaintLogReportForSubordinateMutation,
    useGetSubordinateProfileQuery
} = subordinateApi;