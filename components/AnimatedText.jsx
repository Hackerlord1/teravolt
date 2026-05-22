export default function AnimatedText({ text }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </>
  )
}
