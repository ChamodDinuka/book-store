import { useSelector } from "react-redux";

function Alert() {
  const message = useSelector((state: any) => state.books.alert.message);

  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed right-0 mr-3 mt-3 z-10"
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}

export default Alert;
