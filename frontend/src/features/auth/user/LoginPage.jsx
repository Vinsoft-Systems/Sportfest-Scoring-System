import { BASE_PATH } from '@/constants';
import { Alert, Button, Card, Flex, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'fastapi-rtk';
import { Navigate } from 'react-router-dom';

export default function LoginPage(props) {
  const passwordMinLength = 5;
  const { user, loading, error, signin } = useAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      password: (val) =>
        val.length < passwordMinLength ? `Password should include at least ${passwordMinLength} characters` : null,
    },
  });

  const onSubmit = (data) => signin(data);

  if (user) return <Navigate to={BASE_PATH} />;

  return (
    <Flex h="100vh" justify="center" align="center" direction="column">
      <Title p="md">{document.title}</Title>
      <Card radius="md" p="xl" withBorder {...props}>
        {window.fab_react_config && window.fab_react_config.sso ? (
          <Button component="a" href={window.fab_react_config.sso} variant="contained">
            {' '}
            Login with Single Sign On
          </Button>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
              <TextInput
                required
                label="Name"
                placeholder="Username"
                value={form.values.first_name}
                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                error={form.errors.first_name && 'Invalid username'}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && `Password should include at least ${passwordMinLength} characters`}
              />
              {error ? (
                <Alert title="Login failed" color="red">
                  {error}
                </Alert>
              ) : null}
              <Button color="var(--main)" type="submit" loading={loading} fullWidth>
                Login
              </Button>
            </Stack>
          </form>
        )}
      </Card>
    </Flex>
  );
}
