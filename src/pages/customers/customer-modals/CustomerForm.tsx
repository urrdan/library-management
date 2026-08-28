import MyInput from "src/components/my-input/MyInput";
import type { CustomerProfile } from "src/types/customerTypes";

type CustomerFormProps = {
  data: CustomerProfile;
  onChange?: <K extends keyof CustomerProfile>(
    propName: K,
    value: CustomerProfile[K],
  ) => void;
  errorData?: Partial<Record<keyof CustomerProfile, boolean>>;
  disabled?: boolean;
};

export default function CustomerForm({
  data,
  onChange,
  errorData = {},
  disabled = false,
}: CustomerFormProps) {
  return (
    <div className="grid grid-cols-2 gap-4 gap-x-6">
      <MyInput
        label="First Name"
        value={data.firstName}
        onChange={(value) => onChange?.("firstName", value)}
        error={errorData.firstName}
        disabled={disabled}
      />

      <MyInput
        label="Last Name"
        value={data.lastName}
        onChange={(value) => onChange?.("lastName", value)}
        error={errorData.lastName}
        disabled={disabled}
      />

      <MyInput
        label="Phone"
        value={data.phone}
        onChange={(value) => onChange?.("phone", value)}
        error={errorData.phone}
        disabled={disabled}
      />

      <MyInput
        label="Email"
        value={data.email}
        onChange={(value) => onChange?.("email", value)}
        error={errorData.email}
        disabled={disabled}
      />
    </div>
  );
}
