# Planning Guide

Infinity Spark turns ideas into live websites, websites into tokens, and tokens into a real marketplace — in one click.

**Experience Qualities**:
1. **Instantaneous** - Every action should feel immediate and magical, with zero waiting or processing screens
2. **Empowering** - Users should feel like creators and builders from the first keystroke, never blocked or confused
3. **Living** - The system should feel alive and responsive, with real-time feedback and organic growth

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a world-building platform with multiple interconnected systems: search/generation, website creation, token minting, wallet management, marketplace, and live page building. It requires sophisticated state management, real-time updates, and seamless transitions between creation, ownership, and trading modes.

## Essential Features

### 1. Infinity Search Bar (Core Creation Engine)
- **Functionality**: Single input field that accepts any idea, question, or concept and generates a complete website + token
- **Purpose**: The primary interface for world creation - simplicity meets power
- **Trigger**: User types and presses Enter or clicks the Infinity symbol
- **Progression**: Type query → See loading state with progress → Website generates → Token mints → Redirect to live site with builder visible
- **Success criteria**: Complete website generated within 5 seconds, token minted, wallet updated, all displayed to user

### 2. Instant Website Generation
- **Functionality**: Creates a live, research-backed homepage with title, explanation, real content, embedded search bar, and site metadata
- **Purpose**: Turn abstract ideas into tangible digital assets with real value
- **Trigger**: Automatically triggered after Infinity search submission
- **Progression**: Parse query → Generate research content → Create page structure → Add embedded builder → Display metadata (value, token ID, owner)
- **Success criteria**: Page is readable, informative, includes real research, and can be immediately shared via URL

### 3. Automatic Wallet & Token System
- **Functionality**: Creates wallet on first use, mints 1 token per website, displays balance and token metadata (URL, repo ID, timestamp, valuation)
- **Purpose**: Make every website a tradable asset with provable ownership
- **Trigger**: Automatically on first website creation (wallet), automatically on each new website (token)
- **Progression**: Detect first use → Create wallet → Mint token with metadata → Update balance → Show in wallet view
- **Success criteria**: Wallet appears with correct balance, tokens link to their websites, metadata is accurate

### 4. Live Page Builder (Always Accessible)
- **Functionality**: Visible-by-default builder using the same Infinity search to expand sites, add research, and create new pages
- **Purpose**: Prevent abandoned sites and enable continuous growth
- **Trigger**: Visible on every user-owned site by default, can be toggled
- **Progression**: Site loads → Builder visible → User searches → New content added → Site expands → Builder remains available
- **Success criteria**: Builder is intuitive, doesn't obstruct content, successfully adds pages, can be hidden/shown

### 5. Marketplace (Token Trading)
- **Functionality**: Browse, buy, sell, and transfer website-tokens with live previews and real owners
- **Purpose**: Create a real economy around user-generated websites
- **Trigger**: User clicks Marketplace from main nav or wallet
- **Progression**: Enter marketplace → Browse live websites → View details (value, owner, preview) → Buy/trade → Ownership transfers → Wallet updates
- **Success criteria**: All listings show live sites, transactions complete successfully, ownership transfers include repo access

### 6. Guest-First, Auth-When-Needed
- **Functionality**: Spark initializes fully as guest, login only required for editing/trading, site owners can enable their own auth
- **Purpose**: Remove friction, never block exploration or viewing
- **Trigger**: Guest access on load, login prompt only when attempting owner actions
- **Progression**: Load app → Full guest access → Attempt edit/trade → Login prompt → Authenticate → Owner actions unlocked
- **Success criteria**: No auth screens on initialization, all viewing works as guest, edit/trade properly gated

## Edge Case Handling

- **Empty Search Query**: Prevent submission, show gentle prompt like "What world will you build?"
- **Duplicate Ideas**: Generate unique variations, append timestamp to token ID, ensure no collision
- **Network Failure During Generation**: Show retry option, preserve user's query, resume from last checkpoint
- **Wallet Not Found**: Auto-create on any action requiring it, seamless and invisible
- **Builder Accidentally Hidden**: Show subtle "Show Builder" button in corner, persist preference
- **Marketplace Empty State**: Show inspirational call-to-action, suggest creating first website
- **Token Transfer Failure**: Roll back transaction, show clear error, preserve token ownership
- **Deleted Files/Repos**: Detect deletion, auto-rebuild from intent + history, never break user access

## Design Direction

The design should evoke **cosmic exploration meeting digital creation** - vast, infinite possibilities contained in a clean, powerful interface. It should feel like opening a portal to endless worlds, where complexity is hidden behind elegant simplicity. Think: the calm confidence of a search engine combined with the wonder of watching galaxies form.

## Color Selection

A deep cosmic theme with vibrant accent colors that pop against darkness, creating contrast and energy.

- **Primary Color**: Deep Space Indigo `oklch(0.25 0.08 270)` - Communicates depth, intelligence, and infinite possibility
- **Secondary Colors**: 
  - Cosmic Purple `oklch(0.35 0.15 290)` - For builder elements and secondary actions
  - Nebula Blue `oklch(0.45 0.12 250)` - For informational states and hover effects
- **Accent Color**: Infinity Gold `oklch(0.75 0.15 85)` - Attention-grabbing highlight for CTAs, token indicators, and success states
- **Foreground/Background Pairings**:
  - Background (Deep Black `oklch(0.12 0 0)`): Light Gray text `oklch(0.95 0 0)` - Ratio 16.8:1 ✓
  - Primary (Deep Space Indigo `oklch(0.25 0.08 270)`): White text `oklch(1 0 0)` - Ratio 12.5:1 ✓
  - Accent (Infinity Gold `oklch(0.75 0.15 85)`): Deep Black text `oklch(0.12 0 0)` - Ratio 11.2:1 ✓
  - Cards (Dark Slate `oklch(0.18 0.02 260)`): Light Gray text `oklch(0.95 0 0)` - Ratio 13.4:1 ✓

## Font Selection

Typefaces should communicate **futuristic precision with human warmth** - technical enough to feel powerful, but approachable enough to inspire creativity.

- **Primary Font**: Space Grotesk - Modern geometric sans with tech aesthetic, perfect for the Infinity brand
- **Secondary Font**: Inter - Clean and readable for body content, research text, and long-form content
- **Monospace**: JetBrains Mono - For token IDs, wallet addresses, and technical metadata

**Typographic Hierarchy**:
- H1 (Infinity Logo/Brand): Space Grotesk Bold / 48px / tight letter-spacing (-0.02em)
- H2 (Page Titles): Space Grotesk Bold / 36px / normal letter-spacing
- H3 (Section Headers): Space Grotesk Medium / 24px / normal letter-spacing
- Body (Research Content): Inter Regular / 16px / line-height 1.6 / letter-spacing (-0.01em)
- Small (Metadata): Inter Medium / 14px / letter-spacing (-0.005em)
- Mono (Technical): JetBrains Mono Regular / 14px / letter-spacing (-0.02em)

## Animations

Animations should create a sense of **cosmic energy and instant materialization** - websites don't load, they materialize; tokens don't mint, they spark into existence. Use quick, purposeful motion with physics-based easing to make every action feel satisfying without creating delays. Key moments: search submission (ripple effect), website generation (particles coalescing), token minting (golden flash), page transitions (smooth depth shifts), builder toggle (elegant slide).

## Component Selection

- **Components**:
  - Input + Button (custom Infinity search bar) - Oversized, centered, with glow effects and Infinity icon
  - Card (website previews, token displays) - Dark with subtle borders, hover lifts with glow
  - Dialog (detailed website views, transaction confirmations) - Full-screen overlays with blur backdrop
  - Tabs (wallet sections: sites, tokens, transactions) - Minimal underline style
  - Badge (token IDs, valuations, status indicators) - Rounded, glowing, with animation
  - Avatar (owner indicators) - Generated from wallet addresses
  - Scroll Area (marketplace listings, research content) - Custom scrollbars matching theme
  - Tooltip (metadata on hover) - Quick, subtle, informative
  - Toast (sonner for success/error notifications) - Positioned top-right, with icons

- **Customizations**:
  - Infinity Search Component - Custom oversized input with animated Infinity symbol button
  - Cosmic Background - Animated gradient mesh with subtle particle effects
  - Token Card - Custom component showing website preview + token metadata + value
  - Builder Panel - Slide-in panel with embedded search and page management
  - Website Generator Preview - Live loading state with progress visualization

- **States**:
  - Buttons: Default (subtle glow), Hover (increased glow + scale 1.02), Active (pressed scale 0.98), Disabled (reduced opacity + no glow)
  - Inputs: Default (border glow), Focus (expanded glow + ring), Filled (accent border), Error (red glow)
  - Cards: Default (subtle elevation), Hover (lift + stronger glow + border brightens), Selected (accent border + glow)

- **Icon Selection**:
  - Infinity symbol (custom SVG) - Main brand icon for search
  - MagnifyingGlass (search within builder) - Secondary search actions
  - Wallet (wallet view) - User's token collection
  - Storefront (marketplace) - Trading and browsing
  - Plus (add page, create new) - Creation actions
  - Eye (preview, view) - Viewing actions
  - ArrowsClockwise (rebuild, refresh) - Recovery actions
  - CaretRight/CaretLeft (navigation) - Browsing
  - Crown (ownership indicator) - Owner badges
  - Sparkle (token mint success) - Success states

- **Spacing**:
  - Sections: gap-16 (4rem) between major sections
  - Cards: gap-6 (1.5rem) in grids, padding-6 internal
  - Inputs: padding-4 (1rem) vertical, padding-6 (1.5rem) horizontal
  - Buttons: padding-3 (0.75rem) vertical, padding-8 (2rem) horizontal for primary
  - Content: padding-8 (2rem) for page containers

- **Mobile**:
  - Infinity search bar remains centered and prominent, slightly smaller
  - Marketplace switches from grid to single column
  - Builder panel becomes full-screen overlay on mobile
  - Token cards stack vertically with full width
  - Navigation becomes bottom tab bar on mobile
  - Wallet view uses accordion for sections instead of tabs
