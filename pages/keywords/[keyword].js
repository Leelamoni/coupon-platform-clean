import Head from "next/head";

export async function getServerSideProps({ params }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { keyword } = params;

  try {
    const res = await fetch(`${API}/api/keywords/${keyword}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    if (!data || !data.heading) {
      return { notFound: true };
    }

    return {
      props: { data }
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function KeywordPage({ data }) {
  const brandSlug = data.heading.split(" ")[0].toLowerCase();

  return (
    <>
      <Head>
        <title>{data.title || data.heading}</title>
        <meta
          name="description"
          content={
            data.description ||
            `Best ${data.heading} deals, coupons, and promo codes.`
          }
        />
      </Head>

      <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "900px", margin: "0 auto" }}>

        {/* ===== MAIN SEO CONTENT ===== */}
        <h1>{data.heading}</h1>

        <p style={{ marginBottom: "20px" }}>
          {data.description ||
            `Find the latest ${data.heading} coupons, deals, and promo codes updated today.`}
        </p>

        {/* ===== COUPON LIST ===== */}
        <h2>Available Deals</h2>

        {data.coupons?.length === 0 && (
          <p>No deals available right now. Check back soon.</p>
        )}

        {data.coupons?.map((c) => (
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

        {/* ===== INTERNAL LINK (VERY IMPORTANT FOR SEO) ===== */}
        <p style={{ marginTop: "30px" }}>
          More deals:{" "}
          <a
            href={`/brands/${brandSlug}`}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            View all {brandSlug} coupons
          </a>
        </p>
      </div>
    </>
  );
}

