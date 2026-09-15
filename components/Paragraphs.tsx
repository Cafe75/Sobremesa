export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </>
  )
}
