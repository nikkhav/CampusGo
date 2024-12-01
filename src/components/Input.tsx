import { cn } from "@/lib/utils";

interface InputProps {
  type?: string;
  className?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  className = "",
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm",
        className,
      )}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
