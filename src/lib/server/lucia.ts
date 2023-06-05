import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-prisma";
import prisma from "$lib/server/prisma"
import { dev } from "$app/environment";
import { sveltekit } from "lucia-auth/middleware";

export const auth = lucia({
    adapter: adapter(prisma),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    transformDatabaseUser: (userData) =>
    {
        return userData;
    }
});

export type auth = typeof auth;