import { useAuthContext } from '../../context/AuthContext';
import { LOGIN_TITLE } from '../../constants';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Login() {
  const { handleLogin } = useAuthContext();
  const BUTTON_TEXT = 'Login';

  return (
    <AuthForm 
      title={LOGIN_TITLE}
      onSubmit={handleLogin}
      buttonText={BUTTON_TEXT}
      previousLink="/register"
      formType={'login'}
    />
  )
}
