import Image from 'next/image'

export function Photo({ src, alt, variant = 0, style }: { src?: string | null; alt: string; variant?: 0 | 1 | 2; style?: React.CSSProperties }) {
  const cls = ['photo', variant ? `v${variant}` : ''].join(' ').trim()
  return (
    <div className={cls} style={style} role={src ? undefined : 'img'} aria-label={src ? undefined : alt}>
      {src && <Image src={src} alt={alt} fill sizes="(max-width: 820px) 100vw, 60vw" />}
    </div>
  )
}
