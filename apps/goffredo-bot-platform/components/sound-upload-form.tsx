import axios from 'axios';
import { useState } from 'react';
import { TextInput, Button, Group, Box, FileInput } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';

export default function SoundUploadForm() {
  const [isError, setIsError] = useState(false);

  const onSubmit = (values) => {
    setIsError(false);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('file', values.file);

    axios
      .post('/api/sounds', formData, { withCredentials: true })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });
  };

  const form = useForm({
    initialValues: {
      name: '',
      file: null,
    },

    validate: {
      name: hasLength({ min: 4, max: 20 }, 'Value must have 4-20 characters'),
      file: (value) => {
        if (!value) {
          return 'File is required';
        }

        if (value.size > 10000000) {
          return 'File is too large';
        }

        return null;
      },
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput withAsterisk label="Name" {...form.getInputProps('name')} />

        <FileInput withAsterisk label="File" {...form.getInputProps('file')} />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      {isError && (
        <Box mt="md" color="red">
          Something went wrong
        </Box>
      )}
    </Box>
  );
}
