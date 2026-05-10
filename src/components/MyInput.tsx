type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  error?: boolean;
  onChange?: (value: string) => void;
};

export default function MyInput({
  label,
  type,
  value,
  error,
  onChange,
}: InputProps) {
  return (
    <div className="">
      {label && (
        <div>
          <label className="">{label}</label>{" "}
          {error && <span className="text-red-500 text-lg">!</span>}
        </div>
      )}
      <input
        className="p-2 py-1 w-full border-1 border-gray-400 rounded-lg"
        type={type}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        //onBlur={(e) => onChange && onChange(e.target.value)}
      ></input>
      {error && (
        <p className="text-red-500 italic text-xs">This field is required</p>
      )}
    </div>
  );
}
