'use client'

import type { LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'
import type { LenisRef, LenisProps as ReactLenisProps } from 'lenis/react'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useTempus } from 'tempus/react'

interface LenisProps extends Omit<ReactLenisProps, 'ref'> {
  root: boolean
  options: LenisOptions
  children?: ReactNode
}

export function Lenis({ root, options, children }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null)

  useTempus((time: number) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time)
    }
  })

  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        ...options,
        duration: options?.duration ?? 1.2,
        easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        lerp: options?.lerp ?? 0.125,
        autoRaf: false,
        anchors: true,
        autoToggle: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

