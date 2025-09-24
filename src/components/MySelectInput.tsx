type props = {
  options: string[] | number[];
  label?: string | undefined;
  //onChange: () => void;
  onChange?: (value: string) => void;
};

export default function MySelectInput({ label, options, onChange }: props) {
  return (
    <div className="">
      {label && <label className="block">{label}</label>}
      <select
        onChange={(e) => onChange && onChange(e.target.value)}
        className="p-2 py-1 border-1 border-gray-400 rounded-lg w-full"
      >
        <option></option>
        {options.map((opt, key) => (
          <option key={key}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
