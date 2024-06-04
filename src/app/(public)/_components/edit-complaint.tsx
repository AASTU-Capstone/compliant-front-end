"use client";
import { FilePicker } from "@/shared/dropzone";
import {
  Button,
  Flex,
  Group,
  MultiSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";

type props = {
  closeModal: () => void;
  complaint: any;
};

const EditComplaint = ({ closeModal, complaint }: props) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  const editComplaint = async () => {
    // edit complaint
  };

  useEffect(() => {
    // set the files and content
  }, []);

  return (
    <Flex className="flex-col gap-4 w-full">
      <TextInput
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        className="w-1/2"
        required
      />
      <MultiSelect
        placeholder="Category"
        data={["React", "Angular", "Vue", "Svelte"]}
        value={category}
        onChange={setCategory}
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        placeholder="Content goes here"
        autosize
        minRows={5}
      />

      <FilePicker setFiles={setFiles} files={files} />
      <Group className="justify-end mt-4">
        <Button>Update</Button>
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </Group>
    </Flex>
  );
};

export default EditComplaint;
