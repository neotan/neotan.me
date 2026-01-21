'use client'

import { type ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import TiltedCard from '@/components/TiltedCard'
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

export default function Bio({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={cn(
        'relative',
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.35fr_1fr] md:items-center">
        {/* Left: Bio Text */}
        <div className="space-y-6 text-left">
          <div className="space-y-4">
            {/* Category label */}
            <p className={cn(
              'text-xs font-medium tracking-[0.1em] uppercase',
              'text-primary'
            )}>
              Certified AWS Architect • Full‑Stack Developer
            </p>

            {/* Main heading */}
            <h1
              className={cn(
                'text-4xl leading-tight font-extrabold tracking-tight',
                'text-foreground',
                'sm:text-5xl'
              )}
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient-primary">
                Neo
              </span>.
            </h1>

            {/* Description */}
            <p className={cn(
              'max-w-2xl text-lg leading-relaxed font-light',
              'text-muted-foreground'
            )}>
              I architect cloud solutions, build AI-powered platforms, and{' '}
              create tools developers actually use.{' '}
              20+ years of turning complex problems into elegant code.
            </p>
          </div>
        </div>

        {/* Right: Certifications */}
        <aside aria-label="AWS certifications" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CERTS.map(cert => (
              <Link
                key={cert.href}
                aria-label={`Open credential: ${cert.title}`}
                className={cn(
                  'group relative overflow-hidden',
                  'p-4',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-0.5 hover:border-[#3F3F46]',
                  'focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]'
                )}
                href={cert.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <TiltedCard
                    altText={cert.title}
                    captionText='Click to debunk me.'
                    containerHeight="150px"
                    containerWidth="150px"
                    imageHeight="150px"
                    imageSrc={cert.imageSrc}
                    imageWidth="150px"
                    rotateAmplitude={30}
                    scaleOnHover={1.26}
                    showMobileWarning={false}
                  />
                  <p className="text-xs leading-snug font-medium text-foreground/80">
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
