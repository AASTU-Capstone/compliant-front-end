"use client";
import { useGetComplaintByIdForUserQuery } from "@/lib/redux/features/user";
import ViewComplaint from "@/shared/view-complaint";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";

const ViewComplaintLogById = ({
  id,
  openViewModal,
  isViewModalOpened,
  closeViewModal,
}: {
  id: string;
  openViewModal: () => void;
  isViewModalOpened: boolean;
  closeViewModal: () => void;
}) => {
  const {
    data: complaintById,
    isLoading: complaintLogByIdLoading,
    isSuccess,
  } = useGetComplaintByIdForUserQuery(id);
  const [complaint, setComplaint] = useState();

  useEffect(() => {
    if (isSuccess) {
      setComplaint(complaintById?.data);
      openViewModal();
    }
  }, [isSuccess, complaintById, openViewModal]);

  return (
    <>
      <Modal
        size="70%"
        centered
        opened={isViewModalOpened}
        onClose={closeViewModal}
        title="Complaint"
      >
        {complaint && <ViewComplaint complaint={complaint} />}
      </Modal>
    </>
  );
};

export default ViewComplaintLogById;
