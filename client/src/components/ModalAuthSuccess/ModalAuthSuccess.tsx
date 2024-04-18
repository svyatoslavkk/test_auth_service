import { FAILED_AUTH_MSG, SUCCESS_AUTH_MSG } from "../../constants";
import { useAuthContext } from "../../context/AuthContext";
import crossCheckImg from "../../assets/icons/cross-circle.svg"
import checkCheckImg from "../../assets/icons/check-circle.svg"

export default function ModalAuthSuccess() {
  const { isAuthSuccess, setIsShowModal } = useAuthContext();

  const handleIsShowModalClose = () => {
    setIsShowModal(false);
  }

  return (
    <>
      <div className={`modal__auth__success`}>
        <img 
          src={`${isAuthSuccess ? checkCheckImg : crossCheckImg}`} 
          alt={`${isAuthSuccess ? "Success Icon" : "Failed Icon"}`} 
        />
        <h3>{isAuthSuccess ? (SUCCESS_AUTH_MSG) : (FAILED_AUTH_MSG)}</h3>
        <button className="primary__btn login__btn" onClick={handleIsShowModalClose}>OK</button>
      </div>
      <div className={`layout`}></div>
    </>
  )
}