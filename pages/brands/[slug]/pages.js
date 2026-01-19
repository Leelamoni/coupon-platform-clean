import Head from "next/head";

export async function getServerSideProps({ params }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { slug } = params;

  try {
    const res = await fetch(`${API}/api/brands/${slug}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    if (!data.brand) {
      return { notFound: true };
    }

    return {
      props: {
        brand: data.brand,
        coupons: data.coupons || []
      }
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function BrandPage({ brand, coupons }) {
  const brandName = brand.brandName || brand.slug;

  return (
    <>
      <Head>
        <title>
          {brand.seoTitle ||
            `${brandName} Coupons & Promo Codes 2025 | Latest ${brandName} Deals`}
        </title>
        <meta
          name="description"
          content={
            brand.seoDescription ||
            `Find verified ${brandName} coupon codes, promo codes, and best deals today.`
          }
        />
      </Head>

      <div
        style={{
          padding: "40px",
          fontFamily: "Arial",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* ===== HERO SECTION ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {brand.logo && (
            <img
              src={brand.logo}
              width="120"
              alt={`${brandName} logo`}
              style={{ borderRadius: "8px" }}
            />
          )}
          <div>
            <h1>{brandName} Coupons & Deals</h1>
            <p>
              {brand.seoDescription ||
                `Save money with the latest ${brandName} coupon codes, promo codes, and special offers updated today.`}
            </p>
          </div>
        </div>

        <hr style={{ margin: "25px 0" }} />

        {/* ===== COUPON LIST ===== */}
        <h2>Available Coupons</h2>

        {coupons.length === 0 && (
          <p>
            No verified coupons available right now. Check back soon for new
            {` ${brandName}`} deals.
          </p>
        )}

        {coupons.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
              borderRadius: "6px",
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/out/${c._id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", fontWeight: "bold" }}
            >
              Get Deal →
            </a>
          </div>
        ))}

        {/* ===== INTERNAL LINKS (VERY IMPORTANT FOR SEO) ===== */}
        <div style={{ marginTop: "30px" }}>
          <h3>Related Searches</h3>
          <ul>
            <li>
              <a href={`/keywords/${brand.slug}-shoes-coupon`}>
                {brandName} Shoes Coupon
              </a>
            </li>
            <li>
              <a href={`/keywords/${brand.slug}-promo-code`}>
                {brandName} Promo Code
              </a>
            </li>
            <li>
              <a href={`/keywords/${brand.slug}-discount`}>
                {brandName} Discount
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
