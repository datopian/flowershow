import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import sluggify from "./sluggify";

const getAuthorsDetails = async (authors?: string[], defaultAuthor?: string, avatarPlaceholder?: string) => {
  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  // TODO this will return only up to 1000 objects
  const allObjects = await S3.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: "people/",
      /* Delimiter: "/", */
    })
  )

  // TODO can we get this data in one request?
  const allPeoplePromise = allObjects.Contents?.map(async (o) => {
    const object = await S3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: o.Key,
      })
    )
    return {
      urlPath: o.Key.replace(/\.mdx?$/, ""),
      ...object.Metadata,
    }
  })

  const allPeople = await Promise.all(allPeoplePromise || [])

  let blogAuthors: string[] = [];

  if (authors) {
    blogAuthors = authors;
  } else if (defaultAuthor) {
    blogAuthors = [defaultAuthor];
  } else {
    blogAuthors = [];
  }

  return blogAuthors.map((author) => {
    const matchedAuthor: any = allPeople.find((p: any) => {
      // TODO: slug should probably be a separate column in the DB
      const slug = sluggify(p.urlPath);
      return (
        p.id === author ||
        slug === author ||
        p.name === author
      );
    });
    return matchedAuthor
      ? {
        name: matchedAuthor.name,
        avatar:
          matchedAuthor.avatar ?? avatarPlaceholder,
        // TODO find a better way
        urlPath: matchedAuthor.urlPath,
      }
      : {
        name: author,
        avatar: avatarPlaceholder,
      };
  });
};

export default getAuthorsDetails;
