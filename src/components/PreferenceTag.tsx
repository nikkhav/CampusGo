interface PreferenceTagProps {
  text: string;
  onClick?: () => void;
}

const PreferenceTag = ({ text, onClick }: PreferenceTagProps) => {
  return (
    <span
      className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-50"
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default PreferenceTag;
