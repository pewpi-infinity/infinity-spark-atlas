import { Website, Token, Wallet } from './types'

export function generateWebsiteId(): string {
  return `site-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function generateTokenId(): string {
  return `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function generateWalletAddress(): string {
  return `0x${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}`
}

export function calculateWebsiteValue(website: Website): number {
  const baseValue = 1000
  const pageValue = website.pages.length * 100
  const ageBonus = Math.floor((Date.now() - website.createdAt) / (1000 * 60 * 60 * 24)) * 10
  return baseValue + pageValue + ageBonus
}

export function formatValue(value: number): string {
  return `${value.toLocaleString()} ∞`
}

export function formatWalletAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}

export async function generateWebsiteContent(query: string): Promise<{
  title: string
  description: string
  content: string
}> {
  const promptText = `You are creating a comprehensive, educational website homepage based on this user query: ${query}

Generate a complete website with:
1. A clear, engaging title (5-10 words)
2. A concise description/tagline (15-25 words)
3. Rich, informative content organized into sections with headings

The content should be:
- Educational and research-backed
- Well-structured with clear sections
- Human-readable and engaging
- Practical and actionable
- NOT just a description, but actual valuable information

Return ONLY valid JSON in this exact format:
{
  "title": "Website Title Here",
  "description": "Brief compelling description here",
  "content": "## Section 1\\n\\nParagraph content...\\n\\n## Section 2\\n\\nMore content..."
}`

  try {
    const response = await window.spark.llm(promptText, 'gpt-4o', true)
    const parsed = JSON.parse(response)
    
    return {
      title: parsed.title || 'Untitled Website',
      description: parsed.description || 'A new Infinity website',
      content: parsed.content || '## Welcome\n\nContent is being generated...'
    }
  } catch (error) {
    console.error('Error generating content:', error)
    return {
      title: query,
      description: 'An Infinity-powered website',
      content: `## ${query}\n\nThis website was created to explore: ${query}\n\nContent generation is in progress...`
    }
  }
}

export async function generatePageContent(websiteContext: string, pageQuery: string): Promise<{
  title: string
  content: string
}> {
  const promptText = `You are adding a new page to a website about ${websiteContext}.

The user wants to add a page about: ${pageQuery}

Generate a new page with:
1. A clear page title (3-8 words)
2. Rich, informative content organized with markdown headings and paragraphs

Return ONLY valid JSON in this exact format:
{
  "title": "Page Title Here",
  "content": "## Section\\n\\nContent here..."
}`

  try {
    const response = await window.spark.llm(promptText, 'gpt-4o', true)
    const parsed = JSON.parse(response)
    
    return {
      title: parsed.title || pageQuery,
      content: parsed.content || `## ${pageQuery}\n\nContent coming soon...`
    }
  } catch (error) {
    console.error('Error generating page:', error)
    return {
      title: pageQuery,
      content: `## ${pageQuery}\n\nThis page explores ${pageQuery} in detail.`
    }
  }
}
