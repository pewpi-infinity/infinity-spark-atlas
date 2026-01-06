import { Website } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatValue, formatDate, formatWalletAddress } from '@/lib/generators'
import { Eye, Crown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface WebsiteCardProps {
  website: Website
  isOwned?: boolean
  onView: () => void
}

export function WebsiteCard({ website, isOwned = false, onView }: WebsiteCardProps) {
  return (
    <Card className="cosmic-border bg-card/80 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="p-6" onClick={onView}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                {website.title}
              </h3>
              {isOwned && (
                <Crown weight="fill" className="text-accent" size={20} />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {website.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="font-mono text-xs">
            {website.tokenId}
          </Badge>
          <Badge variant="outline" className="text-accent border-accent/50">
            {formatValue(website.value)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Owner:</span>
            <span className="font-mono">{formatWalletAddress(website.ownerWallet)}</span>
          </div>
          <div className="flex justify-between">
            <span>Created:</span>
            <span>{formatDate(website.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pages:</span>
            <span>{website.pages.length} page{website.pages.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <Button
          className="w-full mt-4 cosmic-glow"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            onView()
          }}
        >
          <Eye size={18} className="mr-2" />
          View Website
        </Button>
      </div>
    </Card>
  )
}
