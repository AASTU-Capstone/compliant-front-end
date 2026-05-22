import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconFile3d,
  IconImageInPicture,
  IconFile,
} from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";
import { useState, useEffect } from "react";

export function FilePicker({
  onFilesSelected,
  ...props
}: Partial<DropzoneProps> & {
  onFilesSelected: (files: {
    images: FileWithPath[];
    audio: FileWithPath[];
    documents: FileWithPath[];
    videos: FileWithPath[];
  }) => void;
}) {
  const [imageFiles, setImageFiles] = useState<FileWithPath[]>([]);
  const [audioFiles, setAudioFiles] = useState<FileWithPath[]>([]);
  const [documentFiles, setDocumentFiles] = useState<FileWithPath[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    onFilesSelected({
      images: imageFiles,
      audio: audioFiles,
      documents: documentFiles,
      videos:videoFiles
    });
  }, [imageFiles, audioFiles, documentFiles,videoFiles]);

  const removeFile = (file: FileWithPath, fileType: string) => {
    switch (fileType) {
      case "image":
        setImageFiles((prevFiles) => prevFiles.filter((f) => file !== f));
        break;
      case "audio":
        setAudioFiles((prevFiles) => prevFiles.filter((f) => file !== f));
        break;
      case "document":
        setDocumentFiles((prevFiles) => prevFiles.filter((f) => file !== f));
        break;
      case "video":
        setVideoFiles((prevFiles) => prevFiles.filter((f)=> file !== f))
      default:
        break;
    }
  };

  const previews = [
    ...imageFiles.map((file, index) => {
      const fileUrl = URL.createObjectURL(file);
      return (
        <Box
          key={index}
          className="border-2 border-gray-300 cursor-pointer"
          onClick={() => removeFile(file, "image")}
        >
          <Image src={fileUrl} onLoad={() => URL.revokeObjectURL(fileUrl)} />
          <Text className="text-sm">{file.name}</Text>
        </Box>
      );
    }),
    ...audioFiles.map((file, index) => {
      const fileUrl = URL.createObjectURL(file);
      return (
        <Box
          key={index}
          className="border-2 border-gray-300 cursor-pointer"
          onClick={() => removeFile(file, "audio")}
        >
          <audio >
            <source src={fileUrl} />
          </audio>
          <Text className="text-sm">{file.name}</Text>
        </Box>
      );
    }),
    ...documentFiles.map((file, index) => {
      return (
        <Box
          key={index}
          className="border-2 border-gray-300 cursor-pointer"
          onClick={() => removeFile(file, "document")}
        >
          <IconFile size={rem(48)} />
          <Text className="text-sm">{file.name}</Text>
        </Box>
      );
    }),

    ...videoFiles.map((file, index) => {
      return (
        <Box
          key={index}
          className="border-2 border-gray-300 cursor-pointer"
          onClick={() => removeFile(file, "video")}
        >
          <IconFile size={rem(48)} />
          <Text className="text-sm">{file.name}</Text>
        </Box>
      );
    }),

  ];

  return (
    <Flex className="w-full gap-7">
      <Group className="w-1/3">
        <Flex className="flex-col w-full">
          <Text>Upload Images</Text>
          <Dropzone
            onDrop={(acceptedFiles) =>
              setImageFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
            }
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "image/*": [], // All images
            }}
            {...props}
            className="h-28 bg-gray-200 shadow-md"
          >
            <Group
              justify="center"
              align="center"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconImageInPicture
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
              <div className="text-center">
                <Text size="sm" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Audio</Text>
          <Dropzone
            onDrop={(acceptedFiles) =>
              setAudioFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
            }
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "audio/*": [],
            }}
            {...props}
            className="h-28 bg-gray-200 shadow-md"
          >
            <Group
              justify="center"
              align="center"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconImageInPicture
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="sm" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Document</Text>
          <Dropzone
            onDrop={(acceptedFiles) =>
              setDocumentFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
            }
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "application/*": [],
            }}
            {...props}
            className="h-28 bg-gray-200 shadow-md"
          >
            <Group
              justify="center"
              align="center"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconImageInPicture
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="sm" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Video</Text>
          <Dropzone
            onDrop={(acceptedFiles) =>
              setVideoFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
            }
            onReject={(files) => console.log("rejected files")}
            maxSize={200 * 1024 ** 2}
            accept={{
              "video/*": [],
            }}
            {...props}
            className="h-28 bg-gray-200 shadow-md"
          >
            <Group
              justify="center"
              align="center"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconImageInPicture
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="sm" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>

        
      </Group>

      <Box className="w-full border border-gray-100">
        <Badge className="font-bold" variant="light" size="xl" radius={0}>
          Selected Files
        </Badge>
        <SimpleGrid
          cols={{ base: 1, sm: 4 }}
          mt={previews.length > 0 ? "md" : 0}
        >
          {previews}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
