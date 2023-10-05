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

## Answers

### Datasource class

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
### Refactored code