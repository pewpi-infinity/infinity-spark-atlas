import { Wallet, Token } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { formatValue, formatWalletAddress, formatDate } from '@/lib/generators'
import { ArrowLeft, Wallet as WalletIcon, Coin, Eye } from '@phosphor-icons/react'

interface WalletViewProps {
  wallet: Wallet
  onBack: () => void
  onViewWebsite: (websiteId: string) => void
}

export function WalletView({ wallet, onBack, onViewWebsite }: WalletViewProps) {
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
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center">
              <WalletIcon size={32} weight="fill" className="text-background" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Wallet</h1>
              <p className="font-mono text-muted-foreground">{formatWalletAddress(wallet.address)}</p>
            </div>
          </div>

          <Card className="cosmic-border cosmic-glow bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm p-8">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">Total Balance</div>
              <div className="text-5xl font-bold text-accent">{formatValue(wallet.balance)}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {wallet.tokens.length} token{wallet.tokens.length !== 1 ? 's' : ''}
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="tokens">
              <Coin size={20} className="mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="info">
              <WalletIcon size={20} className="mr-2" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-6">
            {wallet.tokens.length === 0 ? (
              <Card className="cosmic-border bg-card/80 backdrop-blur-sm p-12 text-center">
                <Coin size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No tokens yet</h3>
                <p className="text-muted-foreground">
                  Create your first website to mint your first token
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {wallet.tokens.map((token) => (
                  <Card key={token.id} className="cosmic-border bg-card/80 backdrop-blur-sm p-6 hover:scale-[1.01] transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{token.metadata.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {token.metadata.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {token.id}
                      </Badge>
                      <Badge variant="outline" className="text-accent border-accent/50">
                        {formatValue(token.value)}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(token.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Website:</span>
                        <span className="font-mono text-xs truncate max-w-[200px]">{token.websiteUrl}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full cosmic-glow"
                      onClick={() => onViewWebsite(token.websiteId)}
                    >
                      <Eye size={18} className="mr-2" />
                      View Website
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <Card className="cosmic-border bg-card/80 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Wallet Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-mono">{wallet.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(wallet.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tokens</span>
                  <span>{wallet.tokens.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-bold text-accent">{formatValue(wallet.balance)}</span>
                </div>
              </div>
            </Card>

            <Card className="cosmic-border bg-primary/20 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-2">About Infinity</h3>
              <p className="text-sm text-muted-foreground">
                Infinity (∞) is the settlement currency for all website-tokens in the marketplace. 
                Every website you create becomes a tradable token backed by real content and research.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
