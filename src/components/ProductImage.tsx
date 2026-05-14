import { Product } from '@/lib/types'
import {
  GaNCharger,
  CarbonPowerBank,
  LoopCable,
  MagDock,
  Cardholder,
  OrganizerPouch,
  SlingPack,
  KeyBar,
  BitDriver,
  Flashlight,
  FieldCover,
  CableClips,
} from './illustrations'

const ILLUSTRATIONS: Record<string, React.FC> = {
  'titan-gan-charger-65w': GaNCharger,
  'carbon-power-bank-10k': CarbonPowerBank,
  'loop-cable-3-in-1': LoopCable,
  'mag-dock-traveler': MagDock,
  'vegan-leather-cardholder': Cardholder,
  'organizer-pouch': OrganizerPouch,
  'sling-pack-mini': SlingPack,
  'titanium-key-organizer': KeyBar,
  'precision-multi-tool': BitDriver,
  'edc-flashlight-ti': Flashlight,
  'field-notes-cover-ti': FieldCover,
  'cable-organizer-clips': CableClips,
}

const CATEGORY_BG: Record<string, string> = {
  power: '#0ea5e9',
  carry: '#8b5cf6',
  utility: '#f59e0b',
}

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  const Illustration = ILLUSTRATIONS[product.slug]
  const bgColor = CATEGORY_BG[product.category] || '#1f1f1f'

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(145deg, ${bgColor}15, ${bgColor}05)`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center p-6">
        {Illustration ? (
          <Illustration />
        ) : (
          <span className="text-xs text-text-muted">{product.name.split(' ').map(w => w[0]).join('')}</span>
        )}
      </div>
    </div>
  )
}
