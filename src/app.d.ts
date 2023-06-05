// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
declare global
{
    namespace App
    {
        // interface Error {}
        type AuthRequest = import("lucia-auth").AuthRequest;
        interface Locals extends AuthRequest
        {
            auth: AuthRequest
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export { };
