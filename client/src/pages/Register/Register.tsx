import { useAuthContext } from '../../context/AuthContext';
import { REG_TITLE } from '../../constants';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Register() {
  const { handleRegister } = useAuthContext();
  const BUTTON_TEXT = 'Register';

  return (
    <AuthForm
      title={REG_TITLE}
      onSubmit={handleRegister}
      buttonText={BUTTON_TEXT}
      previousLink="/login"
      formType={'register'}
    />
  )
}
