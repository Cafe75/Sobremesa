import Image from 'next/image'

type Props = { src?: string | null; alt: string; variant?: 0 | 1 | 2 | 3; style?: React.CSSProperties; className?: string; priority?: boolean }

export function Photo({ src, alt, variant = 0, style, className = '', priority }: Props) {
  return (
    <div className={`photo v${variant} ${className}`.trim()} style={style} role={src ? undefined : 'img'} aria-label={src ? undefined : alt}>
      {src && <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 900px) 100vw, 60vw" />}
    </div>
  )
}
