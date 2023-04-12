import clientPromise from '@/lib/mddb';

export default async function getBlogs() {
  const mddb = await clientPromise;
  const allBlogs = await mddb.getFiles({ folder: 'blog' })
  return allBlogs.map((b) => b.metadata)
  // return allBlogs
  //   .map(({ title, description = null, date, url_path }) => ({
  //     title,
  //     description,
  //     date,
  //     url_path,
  //   }))
  //   .sort((a, b) => new Date(b.date) - new Date(a.date));
}
