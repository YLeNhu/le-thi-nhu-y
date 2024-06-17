interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const priorities = {
        'Osmosis': 100,
        'Ethereum': 50,
        'Arbitrum': 30,
        'Zilliqa': 20,
        'Neo': 20
    };

    const getPriority = (blockchain: string): number => {
        return priorities[blockchain] ?? -99;
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount <= 0;
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
            return 0; // Add missing return 0
        });
    }, [balances]); // Remove unnecessary prices dependency

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        const formatted = balance.amount.toFixed();
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={formatted}
            />
        );
    });

    return (
        <div {...rest}>
            {rows}
        </div>
    );
};
