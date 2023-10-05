# Problem 3

## Task
List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
    1. ReactJS with TypeScript.
    2. Functional components.
    3. React Hooks
2. Implement the Datasource class so that it can retrieve the prices required.
3. You should explicitly state the issues and explain how to improve them.
4. You should also provide a refactored version of the code.

## Quick start
1. Go to `./messy-react` and install dependencies with `npm install`

2. Run `npm start`

## Answers

### Datasource class
```javascript
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
```
### Issues
1. Missing imports and module dependencies

The code uses React and hooks like `{ useState, useEffect, useMemo }` and these should be imported at the top of the file

```javascript
const { children, ...rest } = props;
const balances = useWalletBalances();
// `useState` hook used
const [prices, setPrices] = useState({});

// `useEffect` hook used
useEffect(() => {
const datasource = new Datasource("https://interview.switcheo.com/prices.json");
datasource.getPrices().then(prices => {
    setPrices(prices);
}).catch(error => {
    console.err(error);
});
}, []);
```

The code uses `useWalletBalances` and `WalletRow`, but there are no imports for them

```javascript
const balances = useWalletBalances();
/*
Other code
*/
return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
```

**Improvement**: Import react, hooks and components at the start of the file
```javascript
import React, { useState, useEffect, useMemo } from 'react';
import useWalletBalances from './useWalletBalances';
import WalletRow from './WalletRow';

```

2. Trying to access properties on empty object type dynamically

Typescript doesn't know if the currency attribute exist on each price object

**Improvement**: Provide type for `prices` state
```javascript
  const [prices, setPrices] = useState<Record<string, number>>({});
```

3. Remove BoxProps, fix Props property

BoxProps not defined, so let's not use it. children property is needed also to compile

**Improvement**:
```javascript
interface Props {
  // Add children to props. Even though it is not used, I will add it here first
  children?: React.ReactNode;
}
```

4. Fix typo `err` to `error`

**Improvement**:
```javascript
useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      // Fixed typo: `err` to `error`
      console.error(error);
    });
  }, []);
```

5. Create BlockChainPriority class

Increase seperation of concerns by moving getPriority into a BlockChainPriority class. This increases readability and encapsulation, as users in the wallet page do not need to know how priority is assigned

**Improvement**:
```javascript
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
```
         
6. Changed naming and logic of geting sortedBalances

Change wrong naming, and I assume you want to get amounts > 0 instead of negative amounts

**Improvement**:
```javascript
const balancePriority = BlockChainPriority.getPriority(balance.blockchain);
// Renamed `lhsPriority` to `balancePriority`
if (balancePriority > -99) {
    // Possibly a type: should be > 0 
    if (balance.amount > 0) {
        return true;
    }
}	
``` 

7. Handle equals case in sort

**Improvement**:
```javascript
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
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
```

8. Remove unused dependency in useEffect

`prices` dependency in this `useEffect` is not needed

**Improvement**:
```javascript
useEffect(() => {
/* Other code */
}, [balances]); // removed prices dependency as it is not used
```

9. Add WalletRow as it is not declared but used

**Improvement**:
```javascript
import React from 'react';
import '../css/styles.css';

interface WalletRowProps {
    className?: string;
    key: number;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
    return (
        <tr>
            <td className="currency-name">
                {className}
            </td>
            <td className="currency-amount">
                Amount: {formattedAmount}
            </td>
            <td className="usd-value">
                USD Value: ${usdValue.toFixed(2)}
            </td>
        </tr>
    );
};

export default WalletRow;
```

10. Show the wallet rows in a table

```javascript
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
```
### Refactored code

[Code is in `./messy-react/src/Messy-react/messy_react.tsx`](./messy-react/src/Messy-react/messy_react.tsx)