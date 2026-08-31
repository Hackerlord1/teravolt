'use client'

import { useCallback } from 'react'

/**
 * Returns a ref callback that adds an `is-visible` class to its element
 * the first time it scrolls into view, then stops watching it.
 *
 * It's a *callback* ref rather than an object ref on purpose: some
 * sections (Pricing) render a placeholder first and swap in the real
 * element a tick later, so the observer has to (re)attach whenever the
 * element actually mounts — not just once.
 *
 * Pair it with the `.reveal` / `.reveal-block` CSS in globals.css, which
 * fades and lifts the content into place. The whole effect lives inside
 * `@media (prefers-reduced-motion: no-preference)`, and this hook also
 * reveals the content immediately when the visitor asks for reduced
 * motion or the browser has no IntersectionObserver — so nothing ever
 * stays stuck invisible.
 *
 *   const reveal = useReveal()
 *   <section className="section about-section reveal" ref={reveal}>…</section>
 */
export default function useReveal({ threshold = 0.15 } = {}) {
  return useCallback(
    (el) => {
      if (!el) return undefined

      const prefersReduced = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReduced || typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible')
        return undefined
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          })
        },
        { threshold, rootMargin: '0px 0px -10% 0px' }
      )

      io.observe(el)
      return () => io.disconnect()
    },
    [threshold]
  )
}
