import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Website, Wallet, ViewMode, Token, Page } from '@/lib/types'
import { 
  generateWebsiteId, 
  generateTokenId, 
  generateWalletAddress, 
  calculateWebsiteValue,
  generateWebsiteContent,
  generatePageContent
} from '@/lib/generators'
import { CosmicBackground } from '@/components/CosmicBackground'
import { HomeView } from '@/components/views/HomeView'
import { WebsiteView } from '@/components/views/WebsiteView'
import { WalletView } from '@/components/views/WalletView'
import { MarketplaceView } from '@/components/views/MarketplaceView'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { Wallet as WalletIcon, Storefront, House } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [websites, setWebsites] = useKV<Website[]>('infinity-websites', [])
  const [wallet, setWallet] = useKV<Wallet | null>('infinity-wallet', null)
  
  const [viewMode, setViewMode] = useState<ViewMode>('home')
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isAddingPage, setIsAddingPage] = useState(false)

  const selectedWebsite = websites?.find(w => w.id === selectedWebsiteId)
  const isWebsiteOwned = selectedWebsite && wallet && selectedWebsite.ownerWallet === wallet.address

  const ensureWallet = (): Wallet => {
    if (wallet) return wallet

    const newWallet: Wallet = {
      address: generateWalletAddress(),
      balance: 0,
      tokens: [],
      createdAt: Date.now()
    }
    
    setWallet(newWallet)
    toast.success('Wallet created automatically!')
    return newWallet
  }

  const handleCreateWebsite = async (query: string) => {
    setIsCreating(true)
    
    try {
      const currentWallet = ensureWallet()
      
      const { title, description, content } = await generateWebsiteContent(query)
      
      const websiteId = generateWebsiteId()
      const tokenId = generateTokenId()
      
      const newWebsite: Website = {
        id: websiteId,
        tokenId,
        title,
        description,
        query,
        content,
        url: `https://infinity.spark/${websiteId}`,
        ownerWallet: currentWallet.address,
        value: 1000,
        createdAt: Date.now(),
        lastModified: Date.now(),
        pages: []
      }

      const newToken: Token = {
        id: tokenId,
        websiteId,
        websiteUrl: newWebsite.url,
        ownerWallet: currentWallet.address,
        value: newWebsite.value,
        createdAt: Date.now(),
        metadata: {
          title,
          description,
          query
        }
      }

      setWebsites((current) => [...(current || []), newWebsite])
      
      setWallet((currentWallet) => {
        if (!currentWallet) return null
        return {
          ...currentWallet,
          balance: currentWallet.balance + newWebsite.value,
          tokens: [...currentWallet.tokens, newToken]
        }
      })

      toast.success(`Website "${title}" created and token minted!`)
      
      setSelectedWebsiteId(websiteId)
      setViewMode('website')
    } catch (error) {
      console.error('Error creating website:', error)
      toast.error('Failed to create website. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddPage = async (query: string) => {
    if (!selectedWebsite || !isWebsiteOwned) return
    
    setIsAddingPage(true)
    
    try {
      const { title, content } = await generatePageContent(selectedWebsite.title, query)
      
      const newPage: Page = {
        id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        content,
        createdAt: Date.now()
      }

      setWebsites((current) =>
        (current || []).map((site) => {
          if (site.id === selectedWebsite.id) {
            const updatedSite = {
              ...site,
              pages: [...site.pages, newPage],
              lastModified: Date.now()
            }
            updatedSite.value = calculateWebsiteValue(updatedSite)
            return updatedSite
          }
          return site
        })
      )

      setWallet((currentWallet) => {
        if (!currentWallet) return null
        return {
          ...currentWallet,
          balance: currentWallet.balance + 100,
          tokens: currentWallet.tokens.map(token => {
            if (token.websiteId === selectedWebsite.id) {
              return {
                ...token,
                value: token.value + 100
              }
            }
            return token
          })
        }
      })

      toast.success(`Page "${title}" added successfully!`)
    } catch (error) {
      console.error('Error adding page:', error)
      toast.error('Failed to add page. Please try again.')
    } finally {
      setIsAddingPage(false)
    }
  }

  const handleViewWebsite = (websiteId: string) => {
    setSelectedWebsiteId(websiteId)
    setViewMode('website')
  }

  const handleBack = () => {
    setViewMode('home')
    setSelectedWebsiteId(null)
  }

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      <Toaster position="top-right" />
      
      {viewMode === 'home' && (
        <>
          <nav className="absolute top-0 right-0 p-6 flex gap-3 z-20">
            {wallet && (
              <>
                <Button
                  variant="outline"
                  className="cosmic-border gap-2"
                  onClick={() => setViewMode('wallet')}
                >
                  <WalletIcon size={20} />
                  Wallet
                </Button>
                <Button
                  variant="outline"
                  className="cosmic-border gap-2"
                  onClick={() => setViewMode('marketplace')}
                >
                  <Storefront size={20} />
                  Marketplace
                </Button>
              </>
            )}
          </nav>
          <HomeView onCreateWebsite={handleCreateWebsite} isCreating={isCreating} />
        </>
      )}

      {viewMode === 'website' && selectedWebsite && (
        <WebsiteView
          website={selectedWebsite}
          isOwned={!!isWebsiteOwned}
          onBack={handleBack}
          onAddPage={handleAddPage}
          isAddingPage={isAddingPage}
        />
      )}

      {viewMode === 'wallet' && wallet && (
        <WalletView
          wallet={wallet}
          onBack={handleBack}
          onViewWebsite={handleViewWebsite}
        />
      )}

      {viewMode === 'marketplace' && (
        <MarketplaceView
          websites={websites || []}
          currentWallet={wallet?.address || null}
          onBack={handleBack}
          onViewWebsite={handleViewWebsite}
        />
      )}

      {viewMode !== 'home' && (
        <Button
          variant="ghost"
          className="fixed bottom-6 right-6 cosmic-glow gap-2"
          onClick={() => {
            setViewMode('home')
            setSelectedWebsiteId(null)
          }}
        >
          <House size={20} />
          Home
        </Button>
      )}
    </div>
  )
}

export default App