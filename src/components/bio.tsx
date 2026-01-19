import { type ComponentPropsWithoutRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CERTS = [
  {
    title: 'AWS Certified Solutions Architect – Professional',
    href: 'https://www.credly.com/badges/810942a7-c85b-48bc-add9-0f433d3f243a/public_url',
    imageSrc: '/images/aws-sap-cert.png',
  },
  {
    title: 'AWS Certified AI Practitioner',
    href: 'https://www.credly.com/badges/aaebc2e4-1d19-4c9d-9ccc-84b6dbd91d47/public_url',
    imageSrc: '/images/aws-aip-cert.png',
  },
] as const

const CERT_GLOW_BG =
  'bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.14),' +
  'transparent_60%)]'

export default function Bio({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={cn(
        'px-0',
        'rounded-3xl border border-border/60 bg-background/40 shadow-sm backdrop-blur-sm',
        'p-8 sm:p-10',
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.35fr_1fr] md:items-center">
        <div className="space-y-6 text-left">
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Certified AWS Architect • Full‑Stack Developer
            </p>
            <h1
              className={cn(
                'text-4xl leading-tight font-extrabold tracking-tight text-balance text-foreground',
                'sm:text-5xl'
              )}
            >
              Hi, I&apos;m <span className="text-primary">Neo</span>.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
              I architect cloud solutions, build AI-powered platforms, and{' '}
              create tools developers actually use.{' '}
              <span className="text-foreground/80">20+ years</span>{' '}
              of turning complex problems into elegant code.
            </p>
          </div>
        </div>

        <aside aria-label="AWS certifications" className="space-y-4">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CERTS.map(cert => (
              <Link
                key={cert.href}
                aria-label={`Open credential: ${cert.title}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60',
                  'p-4',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-0.5 hover:border-border hover:bg-card/90 hover:shadow-lg',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'focus-visible:outline-none'
                )}
                href={cert.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 opacity-0',
                    CERT_GLOW_BG,
                    'transition-opacity duration-300 group-hover:opacity-100'
                  )}
                />

                <div className="relative flex flex-col items-center gap-3 text-center">
                  <Image
                    alt={cert.title}
                    className="h-auto w-full max-w-[160px] drop-shadow-sm"
                    height={220}
                    src={cert.imageSrc}
                    title={cert.title}
                    width={220}
                  />
                  <p className="text-xs leading-snug font-medium text-foreground">
                    {cert.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {children}
    </section>
  )
} 
