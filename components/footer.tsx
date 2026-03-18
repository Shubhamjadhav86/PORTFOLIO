export function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 relative overflow-hidden bg-black/20">
            <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row relative z-10">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-center text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase md:text-left">
                        © 2026 // <span className="text-primary hover:glow-primary transition-all">SYSTEM_ARCHITECT: SHUBHAM_JADHAV</span>
                    </p>
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none">
                        TERMINAL_ID: PORTFOLIO_V2.0.4.8
                    </p>
                </div>
                
                <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.3em] uppercase">
                    <a
                        href="https://github.com/Shubhamjadhav86"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-primary transition-all"
                    >
                        SOURCE_CODE
                    </a>
                    <a
                        href="https://github.com/Shubhamjadhav86"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-primary transition-all"
                    >
                        GITHUB_KERNEL
                    </a>
                </div>
            </div>
            
            {/* HUD Scanning Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </footer>
    )
}
