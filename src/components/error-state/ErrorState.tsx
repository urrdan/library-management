import MyButton from "src/components/my-button/MyButton";

export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 text-center">
      <p className="text-gray-600">{message}</p>
      {onRetry && <MyButton title="Retry" onClick={onRetry} sm />}
    </div>
  );
}
