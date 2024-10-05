import { writable } from "svelte/store";

export const n_clusters = writable(3);
export const metric = writable("euclidean");
export const linkage = writable("ward");

export const requestComputation = writable(0);
