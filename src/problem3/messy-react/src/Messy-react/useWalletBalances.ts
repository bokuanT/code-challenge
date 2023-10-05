export interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added missing property
}

export function useWalletBalances(): WalletBalance[] {
    return [
        {
            currency: "BLUR",
            amount: 100,
            blockchain: "Ethereum"
        },
        {
            currency: "bNEO",
            amount: 50,
            blockchain: "Neo"
        },
        {
            currency: "BUSD",
            amount: 2000,
            blockchain: "Osmosis"
        },
        {
            currency: "ETH",
            amount: 5,
            blockchain: "Ethereum"
        },
        {
            currency: "GMX",
            amount: 300,
            blockchain: "Arbitrum"
        },
        {
            currency: "LUNA",
            amount: 400,
            blockchain: "Zilliqa"
        },
        {
            currency: "RATOM",
            amount: 150,
            blockchain: "Osmosis"
        },
        {
            currency: "STRD",
            amount: 600,
            blockchain: "Neo"
        },
        {
            currency: "EVMOS",
            amount: 700,
            blockchain: "Ethereum"
        },
        {
            currency: "IBCX",
            amount: 800,
            blockchain: "Zilliqa"
        }
    ];
}
