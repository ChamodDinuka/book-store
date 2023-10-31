import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { CardProps } from "../../interfaces/typeInterfaces";

function Card(data: CardProps) {
  const { t } = useTranslation();
  const { title, subtitle, isbn13, price, image, count } = { ...data };

  return (
    <div className="p-4 border-2 h-full rounded-lg shadow-md max-w-xl flex items-center space-x-4 gap-4 sm:flex-col sm:max-w-full">
      <div className="shrink-0">
        <img className="h-24 w-24" src={image} alt="ChitChat Logo" />
      </div>
      <div className="sm:text-center">
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500 font-medium">{subtitle}</p>
        <p className="text-slate-500">ISBN: {isbn13}</p>
        <p className="text-slate-500">Price: {price}</p>
      </div>
      <div className="flex flex-col items-end w-full gap-4 sm:items-center sm:ml-0">
        <input
          className="pl-1 border-2 border-gray-700 w-12 rounded-sm"
          type="number"
          min={1}
          defaultValue={count || 1}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            data.counterCallBackFunction(Number(e.target.value),isbn13);
          }}
        />
        {!count ? (
          <Button label={t("label.Add_to_cart")} callBackFunction={data.firstCallBackFunction} />
        ) : (
          <>
            <Button label={t("label.Update")} callBackFunction={data.firstCallBackFunction} />
            <Button label={t("label.Remove")} callBackFunction={data.secondCallBackFunction} />
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
