import { motion } from 'framer-motion'

const a = '#00FFFF'
const a20 = 'rgba(0,255,255,0.2)'
const a40 = 'rgba(0,255,255,0.4)'
const a60 = 'rgba(0,255,255,0.6)'
const muted = '#666'

function Path({ d, delay, duration, ...props }: { d: string; delay?: number; duration?: number; stroke?: string; strokeWidth?: number; opacity?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={a}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: duration ?? 1.5, delay: delay ?? 0, ease: 'easeInOut' }}
      {...props}
    />
  )
}

function PulseCircle({ cx, cy, r, delay = 0 }: { cx: number; cy: number; r: number; delay?: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill="none" stroke={a20} strokeWidth={2}
      initial={{ r: r * 0.5, opacity: 0.8 }}
      animate={{ r: r * 1.5, opacity: 0 }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

function Glow({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={2}
      fill={a}
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ─── 1. Titan GaN Charger ─── */
export function GaNCharger() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Path d="M50 100 L50 60 Q50 50 60 50 L140 50 Q150 50 150 60 L150 100 Z" />
        <Path d="M60 50 L60 40 Q60 35 65 35 L135 35 Q140 35 140 40 L140 50" />
        <Path d="M85 35 L85 28" strokeWidth={2.5} />
        <Path d="M115 35 L115 28" strokeWidth={2.5} />
        <Path d="M90 50 L90 45" strokeWidth={0.5} />
        <Path d="M110 50 L110 45" strokeWidth={0.5} />
        <rect x="72" y="70" width="14" height="10" rx="2" fill={a40} />
        <rect x="114" y="70" width="14" height="10" rx="2" fill={a40} />
        <Path d="M72 75 L86 75" strokeWidth={0.5} />
        <Path d="M114 75 L128 75" strokeWidth={0.5} />
      </motion.g>
      <PulseCircle cx={79} cy={75} r={12} delay={0} />
      <PulseCircle cx={121} cy={75} r={12} delay={0.5} />
      <Glow cx={79} cy={75} />
      <Glow cx={121} cy={75} />
      <motion.text x={100} y={125} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        65W GaN
      </motion.text>
    </svg>
  )
}

/* ─── 2. Carbon Power Bank ─── */
export function CarbonPowerBank() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="40" y="35" width="120" height="75" rx="8" fill="none" stroke={a} strokeWidth={1.5} />
        <line x1="48" y1="58" x2="152" y2="58" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="62" x2="152" y2="62" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="66" x2="152" y2="66" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="70" x2="152" y2="70" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="74" x2="152" y2="74" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="78" x2="152" y2="78" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="82" x2="152" y2="82" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="86" x2="152" y2="86" stroke={a20} strokeWidth={0.5} />
        <line x1="48" y1="90" x2="152" y2="90" stroke={a20} strokeWidth={0.5} />
        <rect x="62" y="42" width="76" height="12" rx="2" fill="none" stroke={a60} strokeWidth={1} />
      </motion.g>
      <motion.rect
        x="64" y="43" width="0" height="10" rx="1" fill={a40}
        animate={{ width: [0, 72, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.text x={100} y={47} textAnchor="middle" fill="black" fontSize={7} fontFamily="monospace" fontWeight={700}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        87%
      </motion.text>
      <motion.text x={100} y={130} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        10,000mAh
      </motion.text>
    </svg>
  )
}

/* ─── 3. Loop Cable ─── */
export function LoopCable() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '100px', originY: '75px' }}
      >
        <Path d="M60 100 Q60 30 100 30 Q140 30 140 100" delay={0.5} />
        <Path d="M60 100 Q60 30 100 30 Q140 30 140 100" delay={0.5} opacity={0.3} strokeWidth={0.5} />
        <circle cx="100" cy="30" r="8" fill="none" stroke={a} strokeWidth={1.5} />
        <circle cx="100" cy="30" r="12" fill="none" stroke={a20} strokeWidth={1} />
      </motion.g>
      <motion.g
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="55" y="100" width="10" height="14" rx="2" fill={a40} />
        <rect x="92" y="100" width="16" height="14" rx="2" fill={a20} />
        <rect x="135" y="100" width="10" height="14" rx="2" fill={a40} />
      </motion.g>
      <motion.text x={100} y={135} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        3-in-1
      </motion.text>
    </svg>
  )
}

/* ─── 4. MagDock Traveler ─── */
export function MagDock() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ rotateX: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 400 }}
      >
        <Path d="M40 100 L60 50 L140 50 L160 100 Z" delay={0.2} />
        <Path d="M60 50 L100 65 L140 50" delay={0.4} />
        <motion.circle
          cx="100" cy="40" r="12"
          fill="none" stroke={a} strokeWidth={1}
          animate={{ r: [12, 14, 12] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="70" cy="80" rx="12" ry="6"
          fill="none" stroke={a20} strokeWidth={1}
          animate={{ rx: [12, 14, 12] }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="130" cy="80" rx="8" ry="5"
          fill="none" stroke={a20} strokeWidth={1}
          animate={{ rx: [8, 10, 8] }}
          transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
      <motion.text x={100} y={133} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        3-in-1 Station
      </motion.text>
    </svg>
  )
}

/* ─── 5. Veil Cardholder ─── */
export function Cardholder() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect x="35" y="45" width="130" height="65" rx="4" fill="none" stroke={a} strokeWidth={1.5} />
      <line x1="40" y1="57" x2="160" y2="57" stroke={a20} strokeWidth={0.5} />
      <line x1="40" y1="95" x2="160" y2="95" stroke={a20} strokeWidth={0.5} />
      <motion.rect
        x="42" y="60" width="116" height="32" rx="2"
        fill={a20} stroke={a40} strokeWidth={0.5}
        animate={{ x: [42, 45, 42] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="55" y="38" width="45" height="28" rx="2" fill={a40} stroke={a60} strokeWidth={0.5} />
        <rect x="105" y="40" width="35" height="24" rx="2" fill={a20} stroke={a40} strokeWidth={0.5} />
      </motion.g>
      <motion.text x={100} y={130} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        RFID Shield
      </motion.text>
    </svg>
  )
}

/* ─── 6. Grid Organizer Pouch ─── */
export function OrganizerPouch() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect x="30" y="35" width="140" height="85" rx="6" fill="none" stroke={a} strokeWidth={1.5} />
      <line x1="30" y1="55" x2="170" y2="55" stroke={a20} strokeWidth={0.5} />
      <motion.g
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="38" y1="65" x2="162" y2="65" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="38" y1="75" x2="162" y2="75" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="38" y1="85" x2="162" y2="85" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="38" y1="95" x2="162" y2="95" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="105" y1="55" x2="105" y2="120" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="135" y1="55" x2="135" y2="120" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1="65" y1="55" x2="65" y2="120" stroke={a20} strokeWidth={0.5} strokeDasharray="2 4" />
      </motion.g>
      <motion.circle cx="60" cy="70" r="3" fill={a} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0, repeat: Infinity }} />
      <motion.circle cx="90" cy="80" r="3" fill={a} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} />
      <motion.circle cx="120" cy="70" r="3" fill={a} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} />
      <motion.circle cx="150" cy="90" r="3" fill={a} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.9, repeat: Infinity }} />
      <motion.text x={100} y={135} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        Modular Grid
      </motion.text>
    </svg>
  )
}

/* ─── 7. Sling Pack Mini ─── */
export function SlingPack() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Path d="M50 45 Q50 30 70 30 L130 30 Q150 30 150 45 L155 95 Q155 110 140 110 L60 110 Q45 110 45 95 Z" delay={0.2} />
      <Path d="M30 70 Q55 65 45 95" delay={0.4} />
      <Path d="M170 70 Q145 65 155 95" delay={0.6} />
      <motion.g
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="100" cy="70" r="8" fill="none" stroke={a} strokeWidth={1} />
        <circle cx="100" cy="70" r="3" fill={a40} />
      </motion.g>
      <rect x="70" y="45" width="60" height="8" rx="3" fill={a20} stroke={a40} strokeWidth={0.5} />
      <motion.text x={100} y={135} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        3L Sling
      </motion.text>
    </svg>
  )
}

/* ─── 8. Titanium KeyBar ─── */
export function KeyBar() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect x="40" y="55" width="120" height="30" rx="8" fill="none" stroke={a} strokeWidth={1.5} />
      <motion.g
        animate={{ rotate: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '100px', originY: '70px' }}
      >
        <motion.g
          animate={{ rotate: [0, -30, 0] }}
          transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '160px', originY: '70px' }}
        >
          <line x1="160" y1="70" x2="175" y2="60" stroke={a} strokeWidth={1} strokeLinecap="round" />
          <circle cx="175" cy="60" r="3" fill="none" stroke={a} strokeWidth={1} />
          <line x1="160" y1="70" x2="178" y2="78" stroke={a} strokeWidth={1} strokeLinecap="round" />
          <circle cx="178" cy="78" r="3" fill="none" stroke={a} strokeWidth={1} />
          <line x1="160" y1="70" x2="172" y2="85" stroke={a} strokeWidth={1} strokeLinecap="round" />
          <circle cx="172" cy="85" r="3" fill="none" stroke={a} strokeWidth={1} />
        </motion.g>
      </motion.g>
      <motion.circle
        cx="55" cy="70" r="5" fill={a40}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.text x={100} y={130} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        Zero-Rattle
      </motion.text>
    </svg>
  )
}

/* ─── 9. Precision Bit Driver ─── */
export function BitDriver() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect x="75" y="25" width="50" height="55" rx="6" fill="none" stroke={a} strokeWidth={1.5} />
      <motion.rect
        x="78" y="85" width="44" height="8" rx="2" fill="none" stroke={a} strokeWidth={1}
        animate={{ height: [8, 12, 8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="82" y1="45" x2="118" y2="45" stroke={a20} strokeWidth={0.5} />
      <line x1="82" y1="50" x2="118" y2="50" stroke={a20} strokeWidth={0.5} />
      <line x1="82" y1="55" x2="118" y2="55" stroke={a20} strokeWidth={0.5} />
      <line x1="82" y1="60" x2="118" y2="60" stroke={a20} strokeWidth={0.5} />
      <line x1="82" y1="65" x2="118" y2="65" stroke={a20} strokeWidth={0.5} />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '100px', originY: '100px' }}
      >
        <rect x="98" y="100" width="4" height="14" rx="1" fill={a40} />
        <rect x="98" y="100" width="4" height="14" rx="1" fill={a40} style={{ transform: 'rotate(90deg)', transformOrigin: '100px 107px' }} />
        <rect x="98" y="100" width="4" height="14" rx="1" fill={a40} style={{ transform: 'rotate(45deg)', transformOrigin: '100px 107px' }} />
        <rect x="98" y="100" width="4" height="14" rx="1" fill={a40} style={{ transform: 'rotate(135deg)', transformOrigin: '100px 107px' }} />
      </motion.g>
      <motion.text x={100} y={135} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        20 Bits
      </motion.text>
    </svg>
  )
}

/* ─── 10. Pulse EDC Light ─── */
export function Flashlight() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect x="65" y="30" width="70" height="75" rx="8" fill="none" stroke={a} strokeWidth={1.5} />
      <rect x="65" y="30" width="70" height="36" rx="8" fill={a40} />
      <motion.g
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="100" y1="10" x2="85" y2="0" stroke={a20} strokeWidth={2} strokeLinecap="round" />
        <line x1="100" y1="10" x2="100" y2="-5" stroke={a20} strokeWidth={2} strokeLinecap="round" />
        <line x1="100" y1="10" x2="115" y2="0" stroke={a20} strokeWidth={2} strokeLinecap="round" />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="100" y1="12" x2="80" y2="2" stroke={a60} strokeWidth={1} strokeLinecap="round" />
        <line x1="100" y1="12" x2="100" y2="-2" stroke={a60} strokeWidth={1} strokeLinecap="round" />
        <line x1="100" y1="12" x2="120" y2="2" stroke={a60} strokeWidth={1} strokeLinecap="round" />
      </motion.g>
      <motion.circle cx="100" cy="120" r="3" fill={a}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.text x={100} y={139} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        1000 lm
      </motion.text>
    </svg>
  )
}

/* ─── 11. Field Cover Titanium ─── */
export function FieldCover() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ rotateY: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 500, originX: '100px', originY: '80px' }}
      >
        <rect x="30" y="35" width="65" height="85" rx="3" fill="none" stroke={a} strokeWidth={1.5} />
        <rect x="105" y="35" width="65" height="85" rx="3" fill="none" stroke={a} strokeWidth={1.5} />
        <line x1="95" y1="35" x2="105" y2="35" stroke={a} strokeWidth={1.5} />
        <line x1="95" y1="120" x2="105" y2="120" stroke={a} strokeWidth={1.5} />
        <line x1="38" y1="50" x2="88" y2="50" stroke={a20} strokeWidth={0.5} />
        <line x1="38" y1="60" x2="88" y2="60" stroke={a20} strokeWidth={0.5} />
        <line x1="38" y1="70" x2="88" y2="70" stroke={a20} strokeWidth={0.5} />
        <line x1="38" y1="80" x2="88" y2="80" stroke={a20} strokeWidth={0.5} />
        <line x1="38" y1="90" x2="88" y2="90" stroke={a20} strokeWidth={0.5} />
        <line x1="38" y1="100" x2="88" y2="100" stroke={a20} strokeWidth={0.5} />
      </motion.g>
      <motion.g
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M170 45 L175 50 L170 55" fill="none" stroke={a} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="175" y1="50" x2="180" y2="50" stroke={a} strokeWidth={1.5} />
      </motion.g>
      <motion.text x={100} y={135} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        Passport Size
      </motion.text>
    </svg>
  )
}

/* ─── 12. Cable Catch Set ─── */
export function CableClips() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="55" cy="65" r="18" fill="none" stroke={a} strokeWidth={1.5} />
        <circle cx="55" cy="65" r="8" fill={a20} stroke={a40} strokeWidth={0.5} />
        <circle cx="145" cy="65" r="18" fill="none" stroke={a} strokeWidth={1.5} />
        <circle cx="145" cy="65" r="8" fill={a20} stroke={a40} strokeWidth={0.5} />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M65 50 Q100 40 135 50" fill="none" stroke={a40} strokeWidth={2} strokeLinecap="round" />
        <path d="M60 70 Q100 85 140 70" fill="none" stroke={a40} strokeWidth={2} strokeLinecap="round" />
      </motion.g>
      <circle cx="100" cy="67" r="3" fill={a} />
      <motion.rect x="42" y="88" width="26" height="6" rx="3" fill={a20} stroke={a40} strokeWidth={0.5} />
      <motion.rect x="132" y="88" width="26" height="6" rx="3" fill={a20} stroke={a40} strokeWidth={0.5} />
      <motion.text x={100} y={120} textAnchor="middle" fill={muted} fontSize={9} fontFamily="monospace">
        Set of 4
      </motion.text>
    </svg>
  )
}
