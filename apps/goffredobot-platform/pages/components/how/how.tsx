import { Stepper } from '@mantine/core';
import { Title, Box } from '@mantine/core';

export function How() {
  return (
    <Box px="100px" my="xl">
      <Title order={3} align="center" mb="lg">
        How does it work?
      </Title>
      <Steps />
    </Box>
  );
}

export function Steps() {
  return (
    <Stepper active={-1} orientation="vertical">
      <Stepper.Step
        label="Log in"
        description='Click on "Access the Dashboard" and log in with Discord'
      />
      <Stepper.Step
        label="Add the bot"
        description="Click on the button to add Goffredo to one of your Discord servers"
      />
      <Stepper.Step
        label="Upload a sound"
        description="Upload any sound you like to play to introduce yourself"
      />
      <Stepper.Step
        label="Enjoy"
        description="Join a voice channel and listen to your theme!"
      />
    </Stepper>
  );
}
