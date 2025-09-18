import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EchoFi</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Breaking echo chambers through AI-powered debates and prediction markets on Somnia blockchain.
            </p>
            <p className="text-sm text-muted-foreground">Built for the Somnia DeFi Mini Hackathon</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#markets" className="hover:text-foreground transition-colors">
                  Markets
                </a>
              </li>
              <li>
                <a href="#debates" className="hover:text-foreground transition-colors">
                  Debates
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-foreground transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#nft" className="hover:text-foreground transition-colors">
                  NFT Marketplace
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#docs" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#github" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#whitepaper" className="hover:text-foreground transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#faucet" className="hover:text-foreground transition-colors">
                  Somnia Faucet
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 EchoFi. Built on Somnia Testnet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
