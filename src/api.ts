import type { Devlog, Project } from "./types";

const base_url = "https://summer.hackclub.com"
// burner account created on a vortex email and is unverified :)
const cookie = `_journey_session=zWHenERL0A%2B0m2q1CmbHOD%2BbtDR3LtsGqBLlMTxyoVP4HyVjJs%2Fipcmrfcquxls8TyueOq1VI7Yudy2NE53WKLxR6l7g2FncnPmQyCl2se6iC5nI6Wxy3wD8J9Ma0xKb70%2FhEu8rpd8qE3qw%2BCW6ghlRqwYf2JzpzUZK98ugCNmNbDQhW6FkSICzcr6JTQ%2FfVoM3pvuSNlhRTs699RqZJr4MCdajD9iSEH1uYj0SNpZSnTIvIaP7QCyLvmvGxr2vTO4fFuKM9oTvRAiHa2b%2B7w9%2BPuMgTvDSvTbNfjVuSzcelXnVhvRJY9eVZaIrCKHLB%2Bu7OwUjbkEkkVtL3qg2Hni2IRr6XTIaVCx3blf%2BccVP9XWouSK6nrDqYG7VaVitp2T2GPfy506NIVXTrXXs6%2BSVDMzrea0nKprUHg%3D%3D--e6djPd74A3xBiuyc--9eabmzNm5M2qRV5x58IDRg%3D%3D`

export async function getUpdates() {
  const res = await fetch(`${base_url}/api/v1/updates`);
  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.statusText}`);
  }
  return res.json().then(d=> d as Devlog[]);
}
export async function getProjects() {
    const res = await fetch(`${base_url}/api/v1/projects`, {
        headers: {
            "Cookie": cookie
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }
    return res.json().then(d=>d as Project[]);
}
export async function getLB() {
    const res = await fetch(`https://explorpheus.hackclub.com/leaderboard`);
    if (!res.ok) {
        throw new Error(`Failed to fetch leaderboard: ${res.statusText}`);
    }
    return res.json();
}
