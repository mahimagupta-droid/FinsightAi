import { Card } from "@heroui/react";
type TransactionCardTypes = {
  _id: string,
  amount: number,
  category: string,
  type: string,
  date: Date,
  description: string,
  paymentMethod: string,
  onDelete: (_id: string) => void
}
export function TransactionCard({ _id, amount, category, type, date, description, paymentMethod, onDelete }: TransactionCardTypes) {
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
            <button className="text-blue-400 border border-border px-2 py-1 rounded cursor-pointer">
              Edit
            </button>
            <button className="text-red-400 border border-border px-2 py-1 rounded cursor-pointer"
              onClick={() => onDelete(_id)}
            >
              Delete
            </button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
} 