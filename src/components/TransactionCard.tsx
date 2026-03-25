import { Card } from "@heroui/react";
type TransactionCardTypes = {
  amount: number,
  category: string,
  type: string, 
  date: Date, 
  description: string, 
  paymentMethod: string
} 
export function TransactionCard({amount, category, type, date, description, paymentMethod}: TransactionCardTypes) {
  return (
    <>
      <Card className="w-[320px] bg-card p-4 rounded border">
        <Card.Header>
          <Card.Title className="text-lg font-semibold">
            ₹{amount} • {category}
          </Card.Title>

          <Card.Description>
            {type.toUpperCase()} • {new Date(date).toLocaleDateString()}
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">{description}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {paymentMethod}
          </p>
          <div className="flex gap-2 mt-4">
            <button className="text-blue-400 border border-border px-2 py-1 rounded">
              Edit
            </button>
            <button className="text-red-400 border border-border px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
} 