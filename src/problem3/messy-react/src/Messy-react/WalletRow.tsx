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
