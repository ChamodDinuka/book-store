import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {ButtonProps} from "../../interfaces/typeInterfaces"

function Button(props: ButtonProps) {
  const { t } = useTranslation();
  const color = useRef("");

  useEffect(() => {
    switch (props.label) {
      case t("label.Add_to_cart"):
        color.current = "bg-black";
        break;
      case t("label.Update"):
        color.current = "bg-yellow-600";
        break;
      case t("label.Remove"):
        color.current = "bg-red-600";
        break;
      default:
        color.current = "bg-black";
        break;
    }
  }, []);

  return (
    <div>
      <button
        className={`px-4 py-1 text-sm ${color.current} text-white font-semibold rounded-full border hover:text-white hover:ring-${color.current} hover:bg-opacity-70`}
        onClick={(e)=>{e.stopPropagation();props.callBackFunction();}}
      >
        {props.label}
      </button>
    </div>
  );
}

export default Button;
