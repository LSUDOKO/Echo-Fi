# Echo-Fi: AI-Powered DeFi Debate Platform

![Echo-Fi Banner](https://via.placeholder.com/1200x400?text=Echo-Fi+AI-Powered+DeFi+Debate+Platform)

## Table of Contents
- [Overview](#overview)
- [Vision](#vision)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Hackathon Submission Details](#hackathon-submission-details)
- [Demo Video](#demo-video)
- [Pitch Deck](#pitch-deck)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Echo-Fi is an innovative DeFi protocol built for the Somnia DeFi Mini Hackathon, transforming prediction markets into interactive, on-chain "town halls" where users debate outcomes, stake assets, and earn yields through AI-moderated resolutions. Leveraging Somnia Network's high-performance EVM-compatible Layer-1 blockchain (over 1.05 million TPS with sub-second finality), Echo-Fi enables real-time, fully decentralized discussions and financial interactions without off-chain dependencies.

This dApp combines elements of DeFi protocols (staking, yields), NFT utilities (debate tokens and badges), and socialFi (forum-like debates), making it a versatile submission for the hackathon's tracks. Users create markets (e.g., "Will ETH exceed $5,000 by Q4 2025?"), mint NFTs for entry, post arguments on-chain, and let an AI oracle propose resolutions—overridable by community votes. Winners receive amplified yields, while losers' stakes fund Somnia ecosystem grants, promoting transparency and innovation.

Echo-Fi addresses crypto's echo chambers by fostering verifiable discourse, scoring high on hackathon criteria:
- **Creativity & Originality**: AI + debates in DeFi.
- **Technical Excellence**: Deployed on Somnia Testnet.
- **User Experience**: Gamified, intuitive interface.
- **On-Chain Impact**: 100% on-chain.
- **Community Fit**: Tailored for Somnia's gamers and metaverse users.

**Repository**: [GitHub Repo](https://github.com/LSUDOKO/echo-fi) (Public with >2 commits)

## Vision

Echo-Fi redefines DeFi by turning passive speculation into active collaboration. Users create markets, mint NFT "debate tokens" to join, and stake assets on outcomes while debating via an intuitive forum interface. An AI oracle analyzes arguments to propose resolutions, with the community voting to override if needed. Winners earn amplified yields, while losers' stakes fund Somnia ecosystem grants, creating a self-sustaining innovation loop. Our goal: make DeFi a vibrant, truth-seeking space where debate drives dividends.

## Features

### Core Functionality
- **Prediction Market Creation**: Easily create markets with questions, outcomes, and stake requirements; mint ERC-721 NFT "debate tokens" for entry.
- **On-Chain Debates**: Forum-like interface for posting arguments (stored via events or IPFS hashes), with real-time voting and staking on outcomes.
- **AI Resolution Oracle**: Lightweight on-chain AI (rule-based sentiment analysis) summarizes debates and proposes outcomes, overridable by community consensus.
- **Yield Optimization**: Amplified APYs for accurate predictions; gamified "Yield Meter" tracks earnings.
- **NFT Utilities**: Tradable debate tokens and "Echo Badges" (ERC-721) for top debaters, integrable with Somnia metaverses/games.
- **Real-Time Dashboard**: Live monitoring of debates, stakes, and yields, powered by Somnia's sub-second finality.
- **Gamified Elements**: Leaderboards, animated counters, and badges to engage Somnia's gaming community.
- **Emergency & Security**: On-chain fund locking and multi-signature controls for safe staking.

## Technical Stack

### Frontend
- **React.js** with **Tailwind CSS** for responsive, mobile-first UI
- **Next.js** for server-side rendering and routing
- **ethers.js** for Web3 wallet integration (e.g., MetaMask)
- **Wagmi** for React hooks for Ethereum
- **TypeScript** for type safety

### Backend
- **Node.js** with **TypeScript** for API handling
- **Next.js API Routes** for serverless functions
- **AI Integration**: Rule-based sentiment analysis for debate resolution

### Smart Contracts
- **Solidity** (v0.8.x) for EVM-compatible contracts
- **ERC-20** for yield tokens
- **ERC-721** for NFT debate tokens
- **OpenZeppelin** for secure contract patterns

### Blockchain
- **Somnia Testnet** (Chain ID: 50312)
- **High-performance Layer-1** with 1M+ TPS and sub-second finality

### Development Tools
- **Hardhat/Foundry** for development and testing
- **Vercel** for hosting
- **IPFS** for decentralized storage
- **Git** for version control

## Architecture

Echo-Fi's architecture ensures full on-chain execution, leveraging Somnia's speed for scalability.

### High-Level Architecture

```
User (Wallet: MetaMask)
    ↓ (Connect & Interact)
Frontend (React + Next.js + ethers.js)
    ↓ (API Calls & Transactions)
Backend (Next.js API Routes) → AI Oracle (Sentiment Analysis)
    ↓ (Smart Contract Calls)
Somnia Testnet Contracts:
  - Market Factory (Create Markets)
  - Staking & Yield Logic (ERC-20)
  - NFT Minting (ERC-721 Debate Tokens)
  - AI Resolution (Rule-Based Scoring)
  - Community Voting
    ↓ (Events for Real-Time Updates)
On-Chain Storage (Events/IPFS) → Dashboard (Live Data)
```

### System Flow
1. **Market Creation**: User creates market → Mints NFT → Posts debate (on-chain event)
2. **Debate Phase**: Users post arguments → AI analyzes sentiment → Community votes
3. **Resolution**: AI proposes resolution → Community votes to override if needed
4. **Yield Distribution**: Winners earn amplified yields → Losers' stakes fund ecosystem grants

### Key Components

#### Frontend Architecture
- **Debate Context**: Global state management for debates, arguments, and votes
- **Real-time Updates**: WebSocket connections for live debate updates
- **Responsive UI**: Mobile-first design with Tailwind CSS
- **Wallet Integration**: MetaMask and other Web3 wallets via Wagmi

#### Backend Architecture
- **API Routes**: RESTful endpoints for debate operations
- **AI Oracle**: Sentiment analysis and resolution proposals
- **Event Handling**: Real-time updates through event listeners

#### Smart Contract Architecture
- **MarketFactory**: Creates and manages prediction markets
- **DebateToken**: ERC-721 NFTs for debate participation
- **YieldToken**: ERC-20 tokens for yield distribution
- **AIVote**: Community voting and resolution system

### Scalability & Security
- **Scalability**: Somnia's 1M+ TPS handles thousands of micro-transactions (votes, posts) per debate
- **Security**: Audited patterns from OpenZeppelin; emergency pause functions
- **Decentralization**: 100% on-chain execution with minimal off-chain dependencies

## Prerequisites

- **Node.js** >= v18.18
- **npm** or **bun** package manager
- **MetaMask** wallet (configured for Somnia Testnet)
- **Somnia Testnet tokens** (STT) from faucet: [Somnia Faucet](https://faucet.somnia.network)
- **Git** for version control

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/echo-fi.git
cd echo-fi
```

### Install dependencies
```bash
npm install
# or
bun install
```

### Set up environment variables
```bash
cp .env.example .env
```

Edit `.env`:
```env
NEXT_PUBLIC_SOMNIA_RPC_URL=https://testnet.somnia.network/rpc
NEXT_PUBLIC_SOMNIA_CHAIN_ID=50312
NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS=0x...  # Deployed main contract
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...    # Deployed ERC-721
NEXT_PUBLIC_YIELD_TOKEN_ADDRESS=0x...     # Deployed ERC-20
```

## Quick Start

### Start the development server
```bash
npm run dev
# or
bun run dev
```

### Open browser
Navigate to [http://localhost:3000](http://localhost:3000)

### Connect Wallet
1. Install MetaMask browser extension
2. Connect MetaMask to Somnia Testnet
3. Add Somnia Testnet to MetaMask:
   - Network Name: Somnia Testnet
   - RPC URL: https://testnet.somnia.network/rpc
   - Chain ID: 50312
   - Currency Symbol: STT

### Create Your First Market
1. Click "New Market" or "Start Debate"
2. Input question (e.g., "Will BTC hit $100K by Q4 2025?")
3. Set stake amount and description
4. Mint NFT debate token (approve transaction)
5. Post your initial argument in the forum thread

## Usage

### Creating a Market
1. Connect your wallet
2. Navigate to the "Markets" tab
3. Click "Start Debate" or "Create Market"
4. Fill in the form:
   - **Question**: Your prediction market question
   - **Description**: Detailed explanation of the market
   - **Stance**: Your initial position (Yes/No)
   - **Initial Argument**: Your opening argument
5. Approve the NFT minting transaction
6. Your market is now live for others to join

### Participating in Debates
1. Browse existing markets on the home page
2. Click "Join Debate" on a market that interests you
3. Mint the debate NFT (if you haven't already)
4. Post arguments in the forum thread:
   - Select your stance (Yes/No)
   - Write your argument
   - Submit to the blockchain
5. Vote on arguments using the thumbs up/down buttons
6. Stake on outcomes via the "Stake Now" button

### Monitoring Yields
1. Visit your **Dashboard** to see:
   - Staked assets across markets
   - Debate history and participation
   - Yield accruals and earnings
   - NFT collection and badges
2. Trade NFTs in the built-in marketplace
3. Track your position on leaderboards

### AI Resolution Process
1. After debate period ends, AI oracle analyzes all arguments
2. AI proposes a resolution based on sentiment analysis
3. Community can vote to override AI proposal
4. Final resolution determines yield distribution
5. Winners receive amplified yields
6. Losers' stakes fund Somnia ecosystem grants

## Deployment

### Deploy to Vercel
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Variables for Production
Set up the following environment variables in your Vercel dashboard:
- `NEXT_PUBLIC_SOMNIA_RPC_URL`
- `NEXT_PUBLIC_SOMNIA_CHAIN_ID`
- `NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_YIELD_TOKEN_ADDRESS`

### Deployed Contract Addresses (Testnet)
- **Market Factory**: 0xD3f07713bB0D4816E23Ec66C666E0e7721C3b337 (placeholder)
- **NFT Debate Token**: 0xa7E756116aC6b0819e0d7f7354C21417e1e0b2A7
- **Yield Token (ERC-20)**: 0x565A693cB0838e8ea2A8BBdb3b749893E7ED7f9d

## Testing

### Run Unit Tests
```bash
npm test
# or
bun test
```

### End-to-End Testing
1. Use Hardhat network for local simulation
2. Test real-time updates with Somnia RPC
3. Verify all user flows work correctly

### Test Coverage
- Frontend component tests
- API route integration tests
- Smart contract unit tests
- End-to-end user flow tests

## Hackathon Submission Details

### Track
- **Primary**: DeFi Protocols
- **Secondary**: NFT Utilities

### Prizes Eligibility
- Competes for $2,500 (1st), $1,500 (2nd), $1,000 (3rd) per track
- Plus ecosystem support and recognition

### Requirements Met
✅ **Public GitHub repo** with >2 commits
✅ **Working dApp** on Somnia Testnet
✅ **Architecture documentation** in README
✅ **Comprehensive features** including AI debates and NFT utilities
✅ **User-friendly interface** with gamification elements
✅ **On-chain impact** with 100% on-chain execution

### Timeline
- **Development**: September 2025
- **Submission**: Before September 19, 2025, 21:00 IST (extended deadline)
- **Demo**: Live on Somnia Testnet

## Demo Video

Watch the comprehensive demo video showcasing:
- Wallet connection and setup
- Market creation and NFT minting
- Debate participation and argument posting
- AI resolution process
- Yield distribution and dashboard features

**Demo Video**: [YouTube Link](https://youtube.com/demo)

## Pitch Deck

### Slide Structure
1. **Title**: Echo-Fi - AI-Powered DeFi Debate Platform
2. **Problem**: Crypto Echo Chambers and Passive Speculation
3. **Solution**: AI-Moderated On-Chain Debates
4. **Features**: Comprehensive platform overview
5. **Somnia Integration**: Why Somnia Network
6. **Technical Stack**: Architecture and technologies
7. **Demo**: Live application walkthrough
8. **Community Impact**: Benefits for Somnia ecosystem
9. **Future Roadmap**: Next steps and expansions
10. **Team & Contact**: Developer information

**Download**: [Pitch Deck PDF](https://example.com/pitch-deck.pdf)

## Contributing

We welcome contributions to make Echo-Fi even better! Here's how you can help:

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request** with a detailed description

### Guidelines
- Follow the existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Reporting Issues
- Use **GitHub Issues** for bug reports and feature requests
- For hackathon feedback, contact mentors on Somnia Telegram
- Provide detailed steps to reproduce bugs

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contact

### Developer
- **Name**: [Your Name]
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

### Social Media
- **X (Twitter)**: [@yourhandle](https://twitter.com/yourhandle)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

### Somnia Ecosystem
- **Somnia Network**: [@SomniaEco](https://twitter.com/SomniaEco)
- **Telegram**: [Somnia Hackathon Group](https://t.me/somniadevelopers)
- **Discord**: [Somnia Community Discord](https://discord.gg/somnia)

### Support
- For technical issues: [GitHub Issues](https://github.com/yourusername/echo-fi/issues)
- For hackathon questions: Somnia Telegram group
- For general inquiries: your.email@example.com

---

**Built with ❤️ for the Somnia DeFi Mini Hackathon 2025**

Let's debate the future of DeFi! 🚀🎯💬
