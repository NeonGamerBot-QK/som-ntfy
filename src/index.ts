import { Database } from "bun:sqlite";
import { createDb } from "./db_stuff";
import { getLB, getProjects } from "./api";
import type { Project } from "./types";
const NTFY_SERVER = Bun.env.NTFY_SERVER || "https://ntfy.sh";
const NTFY_TOPIC = Bun.env.NTFY_TOPIC || "summer-of-making-updates";

console.log(`Sending requests to ${NTFY_SERVER}/${NTFY_TOPIC}`);

// stalking db :3c
const db = new Database(Bun.env.DB_PATH || "stalking.db");
// create table thingymabob
await createDb(db);

async function thisGetsPolled() {
  const projects = await getProjects().then((d) => d as Project[]);
  for (const project of projects) {
    console.log(project);
    db.prepare(
      `INSERT INTO projects (id, title, description, category, readme_link, demo_link, repo_link, slack_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.id,
        project.title || "what the fuck",
        project.description,
        project.category,
        project.readme_link,
        project.demo_link,
        project.repo_link,
        project.slack_id,
      ],
    ).run();
  }
}

thisGetsPolled();
