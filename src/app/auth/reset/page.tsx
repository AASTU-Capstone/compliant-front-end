import { Button, Flex, Text, TextInput } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";

function Reset() {
  return (
    <Flex className="w-full flex-col justify-center px-0 md:px-20">
      <Text className="text-3xl" ta="center" mt="md" mb={10}>
        FORGOT PASSWORD
      </Text>
      <Text className="text-sm" ta="center" c="dimmed" mb={20}>
        Please enter your email to reset the password
      </Text>

      <TextInput
        placeholder="Your Email"
        leftSection={<IconMail size="20px" />}
        size="md"
      />
      <Link href="/auth/verify/1" className="mx-auto">
        <Button mt="xl" size="md">
          Reset Password
        </Button>
      </Link>
    </Flex>
  );
}

export default Reset;
