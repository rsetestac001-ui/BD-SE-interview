export function SpokenAnswer({ text }: { text: string }) {
  const marker = "\n\n點解：";
  const splitAt = text.indexOf(marker);
  if (splitAt < 0) {
    return <p className="leading-8 whitespace-pre-wrap">{text}</p>;
  }
  const spoken = text.slice(0, splitAt);
  const reason = text.slice(splitAt + marker.length);
  return (
    <div className="space-y-3 leading-8">
      <p className="whitespace-pre-wrap">{spoken}</p>
      <p className="whitespace-pre-wrap rounded-lg bg-muted/60 px-3 py-2">
        <span className="font-medium">點解：</span>
        {reason}
      </p>
    </div>
  );
}
