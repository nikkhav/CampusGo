export default function PillLabel({ text }: { text: string }) {
    return (
        <div className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-900">
            <p className="text-lg">{text}</p>
        </div>
    )
}