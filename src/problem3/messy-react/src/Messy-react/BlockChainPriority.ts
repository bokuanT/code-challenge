class BlockchainPriority {
    private static readonly PRIORITIES: Record<string, number> = {
        'Osmosis': 100,
        'Ethereum': 50,
        'Arbitrum': 30,
        'Zilliqa': 20,
        'Neo': 20,
        'default': -99
    };

    static getPriority(blockchain: string): number {
        return this.PRIORITIES[blockchain] || this.PRIORITIES.default;
    }
}

export default BlockchainPriority;
