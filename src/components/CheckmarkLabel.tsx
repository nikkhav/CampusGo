import { Check } from "lucide-react";

export default function CheckmarkLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="bg-gray-200 p-1 rounded-full">
        <Check className="h-4 w-4" />
      </div>
      <span className="font-light text-gray-900">{text}</span>
    </div>
  );
}
