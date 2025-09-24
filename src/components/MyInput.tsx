type props = {
  label?: string | undefined;
  type?: string | undefined;
  onChange?: (value: string) => void;
};

export default function MyInput({ label, type, onChange }: props) {
  return (
    <div className="">
      {label && <label className="block">{label}</label>}
      <input
        className="p-2 py-1 w-full border-1 border-gray-400 rounded-lg"
        type={type}
        //onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={(e) => onChange && onChange(e.target.value)}
      ></input>
    </div>
  );
}
