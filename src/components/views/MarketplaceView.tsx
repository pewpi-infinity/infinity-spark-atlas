import { Website } from '@/lib/types'
import { WebsiteCard } from '@/components/WebsiteCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Storefront } from '@phosphor-icons/react'

interface MarketplaceViewProps {
  websites: Website[]
  currentWallet: string | null
  onBack: () => void
  onViewWebsite: (websiteId: string) => void
}

export function MarketplaceView({ websites, currentWallet, onBack, onViewWebsite }: MarketplaceViewProps) {
  const marketplaceWebsites = websites.filter(w => w.ownerWallet !== currentWallet)

  return (
    <div className="min-h-screen">
      <div className="border-b cosmic-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center">
              <Storefront size={32} weight="fill" className="text-background" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Marketplace</h1>
              <p className="text-muted-foreground">Trade ownership of live websites</p>
            </div>
          </div>

          <Card className="cosmic-border bg-primary/20 backdrop-blur-sm p-6">
            <p className="text-sm text-muted-foreground">
              Every website is a token. Every token is a website. Browse live websites created by others, 
              and trade using Infinity (∞) as the settlement currency.
            </p>
          </Card>
        </div>

        {marketplaceWebsites.length === 0 ? (
          <Card className="cosmic-border bg-card/80 backdrop-blur-sm p-12 text-center">
            <Storefront size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Marketplace is empty</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to create and list a website for trade
            </p>
            <Button onClick={onBack} className="cosmic-glow">
              Create Your First Website
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceWebsites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                isOwned={false}
                onView={() => onViewWebsite(website.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
