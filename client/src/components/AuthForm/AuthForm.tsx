import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { IAuthForm } from '../../types';
import ModalAuthSuccess from '../ModalAuthSuccess/ModalAuthSuccess';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LoginIcon from '../icons/LoginIcon';
import RegIcon from '../icons/RegIcon';

export default function AuthForm({ title, onSubmit, buttonText, previousLink, formType }: IAuthForm) {
  const { formData, handleChange, isShowModal } = useAuthContext();
  const { username, password } = formData;

  return (
    <>
      <div className="auth__form">
        <h2 className="title">{title}</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="input__wrapper">
            <div className="input__icon">
              <EmailRoundedIcon fontSize="small" sx={{ color: "#f8bd24" }} />
            </div>
            <input 
              className="primary__input"
              type="text"
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={handleChange} 
            />
          </div>
          <div className="input__wrapper">
            <div className="input__icon">
              <LockRoundedIcon fontSize="small" sx={{ color: "#f8bd24" }} />
            </div>
            <input 
              className="primary__input"
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={handleChange} 
            />
          </div>
          <div className="buttons">
            <button type="submit" className="primary__btn login__btn">
              {formType === 'login' ? <LoginIcon /> : <RegIcon />}
              {buttonText}
            </button>
            {previousLink && (
              <Link to={previousLink} className="primary__btn white__btn">
                Go to {formType === 'login' ? 'register' : 'login'}
              </Link>
            )}
          </div>
        </form>
      </div>
      {isShowModal && <ModalAuthSuccess />}
    </>
  )
}