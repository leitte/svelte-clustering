/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch('hello_world.py');
    const script = await response.text();

    return { script };
}