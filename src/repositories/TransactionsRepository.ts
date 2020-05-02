import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (acc, item) => {
        return item.type === 'income'
          ? {
              ...acc,
              income: acc.income + item.value,
              total: acc.total + item.value,
            }
          : {
              ...acc,
              outcome: acc.outcome + item.value,
              total: acc.total - item.value,
            };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
