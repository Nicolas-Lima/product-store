import { useContext, useEffect } from "react";
import { FormContext } from "../../contexts/form";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import "./passwordToggle.css";

function PasswordToggle() {
  const { showingPassword, setShowingPassword } = useContext(FormContext);

  useEffect(() => {
    return setShowingPassword(false);
  }, []);

  return (
    <i
      className="passwordToggle"
      onClick={() => {
        setShowingPassword(prevState => !prevState);
      }}>
      {showingPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
    </i>
  );
}

export default PasswordToggle;
