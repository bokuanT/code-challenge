// Added imports
import React, { useState, useEffect, useMemo } from 'react';
import { useWalletBalances, WalletBalance } from './useWalletBalances';
import WalletRow from './WalletRow';
import BlockChainPriority from './BlockChainPriority';
import '../css/styles.css';

// Shifted to separate file for seperation of concerns. This chunk would be deleted
// interface WalletBalance {
//   currency: string;
//   amount: number;
//   blockchain: string; // Added missing property
// }
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Implemented Datasource class
class Datasource {  
  constructor(private url: string) {}

  async getPrices(): Promise<Record<string, number>> {
    const response = await fetch(this.url);
    const pricesArray = await response.json();

    const pricesObj = pricesArray.reduce((acc: Record<string, number>, curr: any) => {
      acc[curr.currency] = curr.price;
      return acc;
    }, {});

    return pricesObj;
  }
}

// Removed box props as it is unclear why it is needed
interface Props {
  // Add children to props. Even though it is not used, I will add it here first
  children?: React.ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  // Be more specific with types so ts wont complain
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      // Fixed typo: `err` to `error`
      console.error(error);
    });
  }, []);

  // Moved getPriority function outside of component, into its own class

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = BlockChainPriority.getPriority(balance.blockchain);
		  // Renamed `lhsPriority` to `balancePriority`
      if (balancePriority > -99) {
          // Possibly a type: should be > 0 
		      if (balance.amount > 0) {
		        return true;
		      }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = BlockChainPriority.getPriority(lhs.blockchain);
		  const rightPriority = BlockChainPriority.getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  } else { // Added this for the case where both priorities are equal
        return 0;
      }  
    });
  }, [balances]); // removed prices dependency as it is not used

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  }); // Added semi colon

  // Changed sortedBalances to formattedBalances
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        // Changed `classes.row` to `balance.currency`
        className={balance.currency}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  // Show this as a table
  return (
    <div {...rest}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
            <th>USD Value</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

// Add export
export default WalletPage;
