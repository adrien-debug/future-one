import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyAuiAQkB3wx0nReYa8IZnunn0EAMxx70LQ";
const OUTPUT_DIR = path.join(
  import.meta.dirname,
  "frontend/public/images"
);

const prompts = [
  {
    name: "sovereignty",
    prompt:
      "A high-end secure data center interior at night, rows of server racks with subtle red and white LED lighting, dark moody atmosphere, ultra-modern architecture, photorealistic, 8k, cinematic lighting, no people, Qatar-inspired minimal aesthetic",
  },
  {
    name: "economy",
    prompt:
      "A futuristic AI neural network data center, glowing blue and gold fiber optic cables connecting servers, abstract digital data streams, dark background, ultra-modern, photorealistic, 8k, cinematic, no people, sleek minimal design",
  },
  {
    name: "influence-neutrality",
    prompt:
      "A glowing digital globe hologram in a dark high-tech command center, network connections spanning continents, blue and gold light accents, photorealistic, 8k, cinematic lighting, no people, futuristic sovereign technology hub",
  },
  {
    name: "influence-connectivity",
    prompt:
      "A satellite communications array on a rooftop at dusk, connecting to a network of data centers below, dark sky with city lights, fiber optic trails, photorealistic, 8k, cinematic, no people, modern Middle Eastern architecture in background",
  },
  {
    name: "influence-trust",
    prompt:
      "A secure digital vault inside a futuristic data center, biometric authentication panels, encrypted data visualization floating in air, dark moody atmosphere with subtle maroon and gold accents, photorealistic, 8k, cinematic, no people",
  },
];

async function generateImage(name, prompt) {
  console.log(`Generating: ${name}...`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Error for ${name}: ${res.status} - ${errText}`);
    return false;
  }

  const data = await res.json();
  const predictions = data.predictions;
  if (!predictions || predictions.length === 0) {
    console.error(`No predictions for ${name}. Response:`, JSON.stringify(data).slice(0, 500));
    return false;
  }

  const imgData = predictions[0].bytesBase64Encoded;
  if (!imgData) {
    console.error(`No image bytes for ${name}`);
    return false;
  }

  const outPath = path.join(OUTPUT_DIR, `${name}.png`);
  const buf = Buffer.from(imgData, "base64");
  fs.writeFileSync(outPath, buf);
  console.log(`  Saved: ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0;
  for (const { name, prompt } of prompts) {
    const ok = await generateImage(name, prompt);
    if (ok) success++;
    // small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\nDone: ${success}/${prompts.length} images generated.`);
}

main().catch(console.error);
