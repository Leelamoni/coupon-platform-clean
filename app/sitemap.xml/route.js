export async function GET() {
  const base = "https://coupon-platform-clean-production.up.railway.app";

  const api = process.env.NEXT_PUBLIC_API_URL;

  const brandsRes = await fetch(`${api}/api/brands`);
  const brands = await brandsRes.json();

  let urls = `
  <url>
    <loc>${base}</loc>
  </url>
  `;

  for (const b of brands) {
    urls += `
    <url>
      <loc>${base}/brands/${b.slug}</loc>
    </url>
    `;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
