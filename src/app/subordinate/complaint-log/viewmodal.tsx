"use client";
import {
  useGetComplaintLogByIdQuery,
} from "@/lib/redux/features/complaintLog";
import ViewComplaint from "@/shared/view-complaint";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";

const ViewComplaintLogById = (
  {id, openViewModal, isViewModalOpened, closeViewModal}:{id:string, openViewModal: () => void; isViewModalOpened:boolean, closeViewModal: () => void;}
) => {
  
  const { data: complaintLogById, isLoading: complaintLogByIdLoading, isSuccess } =
    useGetComplaintLogByIdQuery(id);
  const [complaintLog, setComplaintLog] = useState();

  useEffect(() => {
    if (isSuccess) {
      setComplaintLog(complaintLogById?.data?.complaints);
      openViewModal();
    }
  }, [isSuccess, complaintLogById, openViewModal]);

  return (
    <>
      <Modal
        size="70%"
        centered
        opened={isViewModalOpened}
        onClose={
          closeViewModal
        }
        title="Complaint"
      >
       { complaintLog &&<ViewComplaint complaint={complaintLog} />}
      </Modal>
    </>
  );
};

export default ViewComplaintLogById;
