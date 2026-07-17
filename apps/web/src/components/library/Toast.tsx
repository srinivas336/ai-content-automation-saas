type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  if (!message) return null;

  return (
    <div
      className={`fixed right-6 top-6 z-50 rounded-xl px-5 py-3 text-white shadow-lg transition-all
      ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}