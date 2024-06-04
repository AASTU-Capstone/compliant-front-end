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
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import {
  IconFile,
  IconImageInPicture,
  IconMusic,
  IconUpload,
  IconVideo,
  IconX,
} from "@tabler/icons-react";

interface Props {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

export function FilePicker({ files, setFiles }: Props) {
  const removeFile = (file: FileWithPath) => {
    setFiles((p) => p.filter((f) => file !== f));
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box
        className="border-2 border-gray-300 cursor-pointer"
        onClick={() => removeFile(file)}
      >
        <Image
          key={index}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
        <Text className="text-sm">{file.name}</Text>
      </Box>
    );
  });

  return (
    <Flex className="w-full gap-7">
      <Group className="w-1/3">
        <Flex className="flex-col w-full">
          <Text>Upload Images</Text>
          <Dropzone
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "image/*": [], // All images
            }}
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
                <Text size="md" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Video</Text>
          <Dropzone
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "video/*": [], // All images
            }}
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
                <IconVideo
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="md" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Audio</Text>
          <Dropzone
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "audio/*": [],
            }}
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
                <IconMusic
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="md" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
        <Flex className="flex-col w-full">
          <Text>Upload Document</Text>
          <Dropzone
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={{
              "application/*": [],
            }}
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
                <IconFile
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div className="text-center">
                <Text size="md" inline>
                  Drag or select files here
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Flex>
      </Group>

      <Box className="w-full border border-gray-100">
        <Badge className="font-bold" variant="light" size="xl" radius={0}>
          Uploaded Files
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
