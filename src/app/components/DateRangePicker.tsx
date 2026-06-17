"use client";

interface DateRangePickerProps {
    onRangeChange: (start: Date, end: Date) => void;
}

export default function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const now = new Date();
        let start: Date;
        let end: Date = now;

        if (value === "this_week") {
            start = new Date(now);
            start.setDate(now.getDate() - 7);
        } else if (value === "this_month") {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else {
            // last 3 months
            start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        }

        onRangeChange(start, end);
    };

    return (
        <select
            onChange={handleChange}
            defaultValue="this_month"
            className="bg-card border border-border rounded-lg px-4 py-2 text-textColor"
        >
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="last_3_months">Last 3 Months</option>
        </select>
    );
}