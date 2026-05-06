import { PrismaClient } from "../generated/prisma/client";
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        // Fallback for build-time if env vars are missing
        return new PrismaClient({
            adapter: new PrismaNeon({ connectionString })
        });
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;