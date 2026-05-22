import { FilePicker } from "@/shared/dropzone";
import { FileWithPath } from "@mantine/dropzone";
import React, { useState } from "react";
import { Button, Flex, Group, Select, TextInput, Textarea } from "@mantine/core";

type Props = {
  closeModal: () => void;
};

const CreateComplaint = ({ closeModal }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<{
    images: FileWithPath[];
    audio: FileWithPath[];
    documents: FileWithPath[];
    videos: FileWithPath[];
  }>({
    images: [],
    audio: [],
    documents: [],
    videos: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://anonymous-whisper.onrender.com/api/Complaint/CreateComplaint";
  const token = decodeURIComponent(typeof window !== "undefined" ? document.cookie : "")
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];


    const toBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

  const handleFilesSelected = (selectedFiles: {
    images: FileWithPath[];
    audio: FileWithPath[];
    documents: FileWithPath[];
    videos: FileWithPath[];
  }) => {
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Category", category || "");
    formData.append("Content", content);
    files.images.forEach((file) => {
      formData.append("ImageEvidence", file)});
    files.audio.forEach((file) => formData.append("SoundTrack", file));
    files.documents.forEach((file) => formData.append("Documents", file));
    files.videos.forEach((file) => formData.append("Videos", file));

    try {
      const res = await fetch(url, {
        body: formData,
        method: "Post",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      setTitle("");
      setCategory(null);
      setContent("");
      setFiles({ images: [], audio: [], documents: [], videos: [] });
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex className="flex-col gap-4 w-full">
      <TextInput
        placeholder="Title"
        className="w-1/2"
        required
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <Select
        placeholder="Category"
        data={["bribe", "nepotism", "embezzlement", "abuse of discretion", "black mail", "Graft"]}
        value={category}
        onChange={(value) => setCategory(value)}
      />
      <Textarea
        placeholder="Content goes here"
        autosize
        minRows={5}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      <FilePicker onFilesSelected={handleFilesSelected} />
      <Group className="justify-end mt-4">
        <Button onClick={handleSubmit} loading={isLoading}>
          Create
        </Button>
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </Group>
    </Flex>
  );
};

export default CreateComplaint;
