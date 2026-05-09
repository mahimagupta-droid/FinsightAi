"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  limit: z.number().min(1, "Must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

interface CreateBudgetFormProps {
  onSuccess: () => void;
}

export default function CreateBudgetForm({ onSuccess }: CreateBudgetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema as any),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    onSuccess();
  };

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Create New Budget</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Category Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
            {...register("category")}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Limit Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="limit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Limit
          </label>
          <input
            id="limit"
            type="number"
            className="w-full px-3 py-2 bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
            placeholder="e.g. 500"
            {...register("limit", { valueAsNumber: true })}
          />
          {errors.limit && (
            <p className="text-red-500 text-sm mt-1">{errors.limit.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mt-4"
        >
          Create Budget
        </button>
      </form>
    </div>
  );
}
