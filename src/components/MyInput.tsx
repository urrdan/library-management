type props = {
  label?: string | undefined;
  type?: string | undefined;
};

export default function MyInput({ label, type }: props) {
  return (
    <div className="">
      {label && <label className="block">{label}</label>}
      <input
        type={type}
        className="p-2 py-1 border-1 border-gray-400 rounded"
      ></input>
    </div>
  );
}
