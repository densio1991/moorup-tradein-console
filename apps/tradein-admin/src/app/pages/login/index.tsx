import { useAuth } from '@tradein-admin/libs';
import { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

const FormInput = styled.input`
  width: calc(100% - 18px);
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface FormButtonProps {
  isLoading: boolean;
}

const FormButton = styled.button<FormButtonProps>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.isLoading ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
`;

export function LoginPage() {
  const { state, loginUser } = useAuth();

  const { isAuthenticating } = state.auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      loginUser({ email, password });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormTitle>Login</FormTitle>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <FormInput
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel htmlFor="password">Password:</FormLabel>
        <FormInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="submit" isLoading={isAuthenticating}>
          {isLoading ? 'Logging in...' : 'Login'}
        </FormButton>
      </LoginForm>
    </LoginContainer>
  );
}
