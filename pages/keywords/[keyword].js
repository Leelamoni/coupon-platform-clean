import Head from "next/head";

export async function getServerSideProps({ params }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API}/api/keywords/${params.keyword}`);

  if (!res.ok) return { notFound: true };

  const data = await res.json();

  return { props: { data } };
}

export default function KeywordPage({ data }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <h1>{data.title}</h1>

      {data.coupons.map(c => (
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
