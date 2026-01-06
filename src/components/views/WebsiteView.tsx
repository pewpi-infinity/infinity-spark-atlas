import { Website, Page } from '@/lib/types'
import { InfinitySearch } from '@/components/InfinitySearch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatValue, formatWalletAddress, formatDate } from '@/lib/generators'
import { ArrowLeft, Crown, Eye, EyeSlash, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { marked } from 'marked'

interface WebsiteViewProps {
  website: Website
  isOwned: boolean
  onBack: () => void
  onAddPage: (query: string) => void
  isAddingPage: boolean
}

export function WebsiteView({ website, isOwned, onBack, onAddPage, isAddingPage }: WebsiteViewProps) {
  const [builderVisible, setBuilderVisible] = useState(isOwned)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const displayContent = selectedPage ? selectedPage.content : website.content

  return (
    <div className="min-h-screen">
      <div className="border-b cosmic-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          {isOwned && (
            <Button
              variant="outline"
              onClick={() => setBuilderVisible(!builderVisible)}
              className="gap-2"
            >
              {builderVisible ? (
                <>
                  <EyeSlash size={20} />
                  Hide Builder
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Show Builder
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {website.title}
                </h1>
                {isOwned && (
                  <Crown weight="fill" className="text-accent" size={28} />
                )}
              </div>
              <p className="text-xl text-muted-foreground">
                {website.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="font-mono">
              Token: {website.tokenId}
            </Badge>
            <Badge variant="outline" className="text-accent border-accent/50 text-base px-4 py-1">
              {formatValue(website.value)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Owner</div>
              <div className="font-mono">{formatWalletAddress(website.ownerWallet)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Created</div>
              <div>{formatDate(website.createdAt)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Pages</div>
              <div>{website.pages.length}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">URL</div>
              <div className="font-mono truncate">{website.url}</div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {website.pages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedPage === null ? 'default' : 'outline'}
                onClick={() => setSelectedPage(null)}
              >
                Home
              </Button>
              {website.pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage?.id === page.id ? 'default' : 'outline'}
                  onClick={() => setSelectedPage(page)}
                >
                  {page.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Card className="cosmic-border bg-card/80 backdrop-blur-sm p-8 mb-12">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(displayContent) }}
          />
        </Card>

        {builderVisible && isOwned && (
          <Card className="cosmic-border cosmic-glow bg-secondary/20 backdrop-blur-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Plus size={24} className="text-accent" />
              <h3 className="text-2xl font-bold">Page Builder</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Add new pages to expand your website. Each search creates a new page with research-backed content.
            </p>
            <InfinitySearch
              onSearch={onAddPage}
              isLoading={isAddingPage}
              placeholder="What page would you like to add?"
              size="default"
            />
          </Card>
        )}
      </div>
    </div>
  )
}
