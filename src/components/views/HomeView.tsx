import { InfinitySearch } from '@/components/InfinitySearch'

interface HomeViewProps {
  onCreateWebsite: (query: string) => void
  isCreating: boolean
}

export function HomeView({ onCreateWebsite, isCreating }: HomeViewProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight">
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent animate-cosmic-pulse">
              INFINITY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Turn ideas into live websites, websites into tokens, and tokens into a real marketplace — in one click
          </p>
        </div>

        <div className="w-full">
          <InfinitySearch
            onSearch={onCreateWebsite}
            isLoading={isCreating}
            placeholder="What world will you build?"
            size="large"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="text-4xl">🌐</div>
            <h3 className="text-lg font-semibold text-foreground">Instant Websites</h3>
            <p className="text-sm text-muted-foreground">
              Real research-backed websites generated from your ideas
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🪙</div>
            <h3 className="text-lg font-semibold text-foreground">Tradable Tokens</h3>
            <p className="text-sm text-muted-foreground">
              Every website is a token, every token is a website
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🏪</div>
            <h3 className="text-lg font-semibold text-foreground">Real Marketplace</h3>
            <p className="text-sm text-muted-foreground">
              Trade ownership of live websites with real value
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
