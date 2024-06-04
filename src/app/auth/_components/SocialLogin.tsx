import { Stack } from '@mantine/core';
import { GoogleButton } from './GoogleButton';

export function SocialLogin() {
  return (
    <Stack>
      <GoogleButton radius="xl">Sign in with Google</GoogleButton>
    </Stack>
  );
}
