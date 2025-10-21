type props = {
  label?: string | undefined;
  type?: string | undefined;
  value?: string | number | undefined;
  error?: boolean;
  onChange?: (value: string) => void;
};

export default function MyInput({
  label,
  type,
  value,
  error,
  onChange,
}: props) {
  console.log(error);

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
        onChange={(e) => onChange && onChange(e.target.value)}
        //onBlur={(e) => onChange && onChange(e.target.value)}
      ></input>
      {error && (
        <p className="text-red-500 italic text-xs">This field is required</p>
      )}
    </div>
  );
}
