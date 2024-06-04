import { Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { IconMail, IconPassword } from "@tabler/icons-react";
import Link from "next/link";

function SignUp() {
  return (
    <Paper className="w-full px-0 md:px-20" withBorder={false} radius={0}>
      <Text className="text-3xl" ta="center" mt="md" mb={30}>
        Create Account
      </Text>

      <TextInput
        placeholder="Your Email"
        leftSection={<IconMail size="20px" />}
        size="md"
      />
      <PasswordInput
        placeholder="Your password"
        mt="md"
        size="md"
        leftSection={<IconPassword size="20px" />}
      />
      <PasswordInput
        placeholder="Confirm password"
        mt="md"
        size="md"
        leftSection={<IconPassword size="20px" />}
      />
      <Button fullWidth mt="xl" size="md">
        Create Account
      </Button>
      <Text ta="center" c="dimmed" mt="lg">
        I have an account?{" "}
        <Link className="text-primary-default" href="/auth/sign-in">
          Sign In
        </Link>
      </Text>
    </Paper>
  );
}

export default SignUp;
