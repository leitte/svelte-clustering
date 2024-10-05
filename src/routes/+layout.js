// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch('hello_world.py');
    const script = await response.text();

    return { script };
}