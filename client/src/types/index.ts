export type Form = {
  username: string;
  password: string;
}

export type IAuthContext = {
  formData: Form;
  setFormData: React.Dispatch<React.SetStateAction<Form>>;
  isAuthSuccess: boolean;
  setIsAuthSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  handleRegister: (e: React.FormEvent) => Promise<void>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}

export type IAuthForm = {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  previousLink?: string;
  formType: 'login' | 'register';
}
