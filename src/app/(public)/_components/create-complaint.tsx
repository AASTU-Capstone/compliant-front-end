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
import { useState } from "react";

type props = {
  closeModal: () => void;
};

const CreateComplaint = ({ closeModal }: props) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  const createComplaint = async () => {
    // create complaint
  };

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
        <Button>Create</Button>
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </Group>
    </Flex>
  );
};

export default CreateComplaint;
