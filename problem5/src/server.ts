import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  process.stdout.write(`Server running on http://localhost:${env.port}\n`);
});