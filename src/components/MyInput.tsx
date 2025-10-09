type props = {
  label?: string | undefined;
  type?: string | undefined;
  value?: string | number | undefined;
  onChange?: (value: string) => void;
};

export default function MyInput({ label, type, value, onChange }: props) {
  return (
    <div className="">
      {label && <label className="block">{label}</label>}
      <input
        className="p-2 py-1 w-full border-1 border-gray-400 rounded-lg"
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        //onBlur={(e) => onChange && onChange(e.target.value)}
      ></input>
    </div>
  );
}
