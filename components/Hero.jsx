'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogoScroll from './LogoScroll'

/* ------------------------------------------------------------------
 * Hero visual — a typing-console simulation (Aiven-style). Glyphs
 * spin / sway / fade in behind a glass panel that is dragged in from
 * the top-right and expands downward; a curl call types itself out;
 * then the cursor returns, drags a selection across one line, and
 * settles on the panel's bottom edge. Plays once and stops.
 * ------------------------------------------------------------------ */

// [class, text] pairs per line. class: 'key' (cyan), 'str' (green), '' (plain).
const CONSOLE_CODE = [
  [['key', 'curl'], ['', ' \\']],
  [['', '  --request POST \\']],
  [['', '  --url \\']],
  [['str', "'https://api.teravoltdigital.website/v1/projects/PROJECT/sites'"], ['', ' \\']],
  [['', '  --header '], ['str', "'authorization: Bearer TERAVOLT_TOKEN'"], ['', ' \\']],
  [['', '  --header '], ['str', "'content-type: application/json'"], ['', ' \\']],
  [['', '  --data '], ['str', "'{"]],
  [['', '    '], ['key', '"site_name"'], ['', ': '], ['str', '"my-website"'], ['', ',']],
  [['', '    '], ['key', '"region"'], ['', ': '], ['str', '"google-europe-west3"'], ['', ',']],
  [['', '    '], ['key', '"plan"'], ['', ': '], ['str', '"startup-4"'], ['', ',']],
  [['', '    '], ['key', '"framework"'], ['', ': '], ['str', '"next.js"']],
  [['', '  '], ['str', "}'"]],
]

const CONSOLE_CONFIG = {
  cursorLabel: 'Teravolt',
  glyphsMs: 1400, // glyphs alone before the panel appears
  enterMs: 1350, // panel travels in and widens — must match the CSS
  typeLeadMs: 140, // typing starts this long into the downward expansion
  charDelay: 26,
  jitter: 26,
  linePause: 130,
  afterTypeMs: 520, // beat before the cursor comes back
  cursorInMs: 820, // cursor travel to the start of the selected line
  selectMs: 900, // selection sweep — must match the .tc-sel transition
  holdSelMs: 700,
  settleMs: 900, // cursor drop to the panel's bottom edge
  selectLine: 10, // zero-based: the "framework" line
  loop: false, // the source plays once and stops
  holdPause: 4500,
}

const TypingConsole = memo(function TypingConsole() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const CONFIG = CONSOLE_CONFIG
    const CODE = CONSOLE_CODE

    const win = stage.querySelector('.tc-window')
    const code = stage.querySelector('.tc-code')
    const pointer = stage.querySelector('.tc-pointer')
    stage.querySelector('.tc-pointer-label').textContent = CONFIG.cursorLabel

    const caret = document.createElement('span')
    caret.className = 'tc-caret'

    let timers = []
    let token = 0
    let lines = []

    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))
    const clearTimers = () => {
      timers.forEach(clearTimeout)
      timers = []
    }
    const cqi = () => stage.offsetWidth / 100 // one cqi in px

    const movePointer = (x, y) => {
      pointer.style.transform = 'translate(' + x + 'px,' + y + 'px)'
    }

    const parkPointer = () => {
      pointer.style.transition = 'none'
      pointer.style.opacity = '0'
      movePointer(cqi() * 104, cqi() * 6)
      void pointer.offsetWidth // flush, so the next transition runs
    }

    const resetAll = () => {
      clearTimers()
      code.innerHTML = ''
      lines = []
      stage.dataset.phase = 'idle'
      parkPointer()
    }

    const addLine = () => {
      const el = document.createElement('div')
      el.className = 'tc-line'
      code.appendChild(el)
      lines.push(el)
      return el
    }

    const delayFor = (ch) => {
      let d = CONFIG.charDelay + Math.random() * CONFIG.jitter
      if (ch === ',' || ch === '\\' || ch === '{') d += 80
      if (ch === ' ') d *= 0.6
      return d
    }

    // Bounding box of a line's visible characters only, so the selection
    // band starts at the first glyph and ends at the last, not at the
    // indent or a trailing space.
    const codeRect = (line) => {
      const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT, null)
      const nodes = []
      let text = ''
      let n
      while ((n = walker.nextNode())) {
        nodes.push({ node: n, at: text.length })
        text += n.nodeValue
      }
      const first = text.search(/\S/)
      if (first < 0) return null
      const last = text.replace(/\s+$/, '').length
      const pos = (i) => {
        for (let k = nodes.length - 1; k >= 0; k--) {
          if (i >= nodes[k].at) return [nodes[k].node, i - nodes[k].at]
        }
        return [nodes[0].node, 0]
      }
      const r = document.createRange()
      const a = pos(first)
      const b = pos(last)
      r.setStart(a[0], a[1])
      r.setEnd(b[0], b[1])
      return r.getBoundingClientRect()
    }

    const paintInstantly = () => {
      code.innerHTML = ''
      lines = []
      stage.dataset.phase = 'settled'
      CODE.forEach((tokens) => {
        const line = addLine()
        tokens.forEach((tk) => {
          const s = document.createElement('span')
          if (tk[0]) s.className = 'tc-' + tk[0]
          s.textContent = tk[1]
          line.appendChild(s)
        })
      })
    }

    /* 1. glyphs alone */
    const glyphsIn = async (mine) => {
      stage.dataset.phase = 'glyphs'
      await wait(CONFIG.glyphsMs)
      return mine === token
    }

    /* 2. panel slides in on its own — the pointer stays parked and
       hidden; it only appears later for the highlight step. */
    const enter = async (mine) => {
      stage.dataset.phase = 'enter'
      void win.offsetWidth // commit the parked position, then transition
      await wait(CONFIG.enterMs)
      return mine === token
    }

    /* 3. panel expands downward while the code types into it */
    const openAndType = async (mine) => {
      stage.dataset.phase = 'open'
      await wait(CONFIG.typeLeadMs)
      if (mine !== token) return false

      for (let i = 0; i < CODE.length; i++) {
        const line = addLine()
        line.appendChild(caret)
        const tokens = CODE[i]
        for (let t = 0; t < tokens.length; t++) {
          const span = document.createElement('span')
          if (tokens[t][0]) span.className = 'tc-' + tokens[t][0]
          line.insertBefore(span, caret)
          const text = tokens[t][1]
          for (let c = 0; c < text.length; c++) {
            span.textContent += text[c]
            await wait(delayFor(text[c]))
            if (mine !== token) return false
          }
        }
        await wait(CONFIG.linePause)
        if (mine !== token) return false
      }
      caret.remove()
      return true
    }

    /* 4. cursor returns and drags a selection across one line */
    const select = async (mine) => {
      const line = lines[CONFIG.selectLine]
      if (!line) return false
      stage.dataset.phase = 'select'

      await wait(CONFIG.afterTypeMs)
      if (mine !== token) return false

      const sRect = stage.getBoundingClientRect()
      const lRect = line.getBoundingClientRect()
      const cRect = codeRect(line) // measure before inserting the band
      if (!cRect) return false

      const x0 = cRect.left - sRect.left // first visible character
      const y0 = lRect.top - sRect.top
      const w = cRect.width // ends at the last one
      const selLeft = cRect.left - lRect.left

      // The arrow's tip sits a little in from the svg's top-left corner;
      // offset every move by that so the tip — not the box — lands on the text.
      const tipX = cqi() * 0.5
      const tipY = cqi() * 0.55

      parkPointer()
      pointer.style.transition =
        'transform ' + CONFIG.cursorInMs + 'ms cubic-bezier(.33,.9,.3,1), opacity 220ms ease'
      pointer.style.opacity = '1'
      void pointer.offsetWidth
      movePointer(x0 - tipX, y0 - tipY) // tip lands on the first character
      await wait(CONFIG.cursorInMs)
      if (mine !== token) return false

      // The band and the arrow run on one shared timeline, started in the
      // same frame, so the selection's right edge stays pinned to the tip
      // for the whole sweep — it grows as the cursor drags, not before it.
      const sweep = 'cubic-bezier(.42, 0, .3, 1)'
      const sel = document.createElement('div')
      sel.className = 'tc-sel'
      sel.style.left = selLeft + 'px'
      sel.style.width = '0px'
      sel.style.transition = 'none'
      line.insertBefore(sel, line.firstChild)
      void sel.offsetWidth // commit the collapsed band

      sel.style.transition = 'width ' + CONFIG.selectMs + 'ms ' + sweep
      pointer.style.transition = 'transform ' + CONFIG.selectMs + 'ms ' + sweep
      void sel.offsetWidth
      movePointer(x0 + w - tipX, y0 - tipY)
      sel.style.width = w + 'px'

      await wait(CONFIG.selectMs + CONFIG.holdSelMs)
      return mine === token
    }

    /* 5. cursor settles on the panel's bottom edge */
    const settle = async (mine) => {
      const sRect = stage.getBoundingClientRect()
      const wRect = win.getBoundingClientRect()
      pointer.style.transition = 'transform ' + CONFIG.settleMs + 'ms cubic-bezier(.32,.9,.35,1)'
      movePointer(cqi() * 23, wRect.bottom - sRect.top - cqi() * 4)
      await wait(CONFIG.settleMs)
      if (mine !== token) return false
      stage.dataset.phase = 'settled'
      return true
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const play = async () => {
      const mine = ++token
      clearTimers()
      if (reduced.matches) {
        paintInstantly()
        return
      }

      resetAll()
      await wait(60)
      if (mine !== token) return

      while (true) {
        if (!(await glyphsIn(mine))) return
        if (!(await enter(mine))) return
        if (!(await openAndType(mine))) return
        if (!(await select(mine))) return
        if (!(await settle(mine))) return

        if (!CONFIG.loop) return
        await wait(CONFIG.holdPause)
        if (mine !== token) return
        resetAll()
        await wait(80)
        if (mine !== token) return
      }
    }

    let started = false
    let io = null

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !started) {
              started = true
              play()
            }
          })
        },
        { threshold: 0.3 }
      )
      io.observe(stage)
    } else {
      started = true
      play()
    }

    const onVisibility = () => {
      if (document.hidden) {
        token++
        clearTimers()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      token++
      clearTimers()
      if (io) io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="tc-stage" ref={stageRef} data-phase="idle">
      <div className="tc-glyph tc-glyph--star" aria-hidden="true">
  <div className="tc-glyph-i">
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#FF4500">
        <rect x="92" y="0" width="56" height="240" />
        <rect
          x="92"
          y="0"
          width="56"
          height="240"
          transform="rotate(60 120 120)"
        />
        <rect
          x="92"
          y="0"
          width="56"
          height="240"
          transform="rotate(120 120 120)"
        />
      </g>
    </svg>
  </div>
</div>

      <div className="tc-glyph tc-glyph--slash" aria-hidden="true">
  <div className="tc-glyph-i">
    <svg viewBox="0 0 200 400">
      <defs>
        <linearGradient id="slashFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--tc-yellow)" stopOpacity="1" />
          <stop offset="60%" stopColor="var(--tc-yellow)" stopOpacity="0.8" />
          <stop offset="80%" stopColor="var(--tc-yellow)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--tc-yellow)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path fill="url(#slashFade)" d="M 120 0 L 200 0 L 80 400 L 0 400 Z" />
    </svg>
  </div>
</div>

      <div className="tc-glyph tc-glyph--brace" aria-hidden="true">
  <div className="tc-glyph-i">
    <svg viewBox="0 0 200 400">
      <g transform="skewX(-12)">
        <path
          fill="var(--tc-green)"
          d="M 190 10 H 120 C 80 10 70 40 70 80 V 150 C 70 180 50 195 10 200 C 50 205 70 220 70 250 V 320 C 70 360 80 390 120 390 H 190 V 330 H 150 C 135 330 130 320 130 300 V 250 C 130 220 115 205 90 200 C 115 195 130 180 130 150 V 100 C 130 80 135 70 150 70 H 190 Z"
        />
      </g>
    </svg>
  </div>
</div>

      <div className="tc-window" aria-hidden="true">
        <div className="tc-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="tc-rule" />
        <div className="tc-code" />
      </div>

      <div className="tc-pointer" aria-hidden="true">
        <svg viewBox="0 0 22 24" fill="none">
          <path
            d="M3.4 2.1 L3.4 19.2 Q3.4 21.1 4.8 19.9 L8.5 16.3 L11.4 22.3 Q12 23.5 13.2 22.9 L14.9 22.1 Q16.1 21.5 15.5 20.3 L12.8 14.5 L17.9 14.1 Q19.7 14 18.4 12.7 L5.2 1.2 Q3.4 -0.3 3.4 2.1 Z"
            fill="var(--tc-cursor)"
            stroke="#10131c"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="tc-pointer-label" />
      </div>

      <p className="tc-sr">
        A curl request that creates a site through the Teravolt API.
      </p>
    </div>
  )
})

export default function Hero() {
  const { t, i18n } = useTranslation('home')

  const [wordIndex, setWordIndex] = useState(0)
  const [animState, setAnimState] = useState('visible')

  const cyclingWords = [
    { text: t('hero.websites'), color: 'black' },
    { text: t('hero.experiences'), color: 'orange' },
    { text: t('hero.solutions'), color: 'black' },
    { text: t('hero.platforms'), color: 'orange' },
    { text: t('hero.products'), color: 'black' },
    { text: t('hero.brands'), color: 'orange' },
  ]

  /*
   * Reset the rotating word after changing language.
   * This makes the new language appear immediately
   * and avoids retaining an outdated word index.
   */
  useEffect(() => {
    setWordIndex(0)
    setAnimState('visible')
  }, [i18n.resolvedLanguage])

  useEffect(() => {
    let exitTimeout
    let visibleTimeout

    const interval = setInterval(() => {
      setAnimState('exit')

      exitTimeout = setTimeout(() => {
        setWordIndex(
          (previousIndex) =>
            (previousIndex + 1) % cyclingWords.length
        )

        setAnimState('enter')

        visibleTimeout = setTimeout(() => {
          setAnimState('visible')
        }, 50)
      }, 380)
    }, 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(exitTimeout)
      clearTimeout(visibleTimeout)
    }
  }, [cyclingWords.length])

  const currentWord = cyclingWords[wordIndex] ?? cyclingWords[0]

  return (
    <>
      <div className="hero-wrapper">
        <section
          id="home"
          className="hero"
        >
          <div className="hero-left">
            <div className="hero-line-graphics">
              <span className="hero-graphics-text">
                {t('hero.graphics')},
              </span>
            </div>

            <div className="hero-line-main">
              <span className="hero-big-orange">
                {t('hero.web_design')}
              </span>
            </div>

            <div className="hero-line-black">
              <span className="hero-big-black">
                &amp;{' '}
                {t('hero.and_hosting')}
              </span>
            </div>

            <div className="hero-line-animated">
              <span
                className={`hero-word-swap ${animState} ${
                  currentWord.color === 'orange'
                    ? 'word-orange'
                    : 'word-black'
                }`}
              >
                {currentWord.text}
              </span>

              <span className="hero-word-dot">
                .
              </span>
            </div>

            <div className="hero-subtitle-row">
              <p className="hero-subtitle-new">
                <span>
                  {t('hero.tagline_part1')}
                </span>

                {' '}&amp;{' '}

                <span>
                  {t('hero.tagline_part2')}
                  .
                </span>
              </p>

              <div className="hero-badge hero-badge--inline">
                <span className="badge-number">
                  50+
                </span>

                <span
                  className="badge-star"
                  aria-hidden="true"
                >
                  ⭐
                </span>

                <span className="badge-text">
                  {t('hero.projects_badge')}
                </span>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line" />

            <span>
              {t('hero.scroll_text')}
            </span>
          </div>
        </section>

        <div className="code-editor-float">
          <TypingConsole />
        </div>
      </div>

      <LogoScroll />
    </>
  )
}
