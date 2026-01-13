import Head from "next/head";

export async function getServerSideProps({ params }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API}/api/brands/${params.slug}`);

  if (!res.ok) return { notFound: true };

  const data = await res.json();

  return {
    props: {
      brand: data.brand,
      coupons: data.coupons || []
    }
  };
}

export default function BrandPage({ brand, coupons }) {
  return (
    <>
      <Head>
        <title>{brand.brandName} Coupons</title>
        <meta name="description" content={brand.seoDescription} />
      </Head>

      <h1>{brand.brandName} Coupons</h1>

      {coupons.map(c => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/out/${c._id}`}>
            Get Deal
          </a>
        </div>
      ))}
    </>
  );
}
