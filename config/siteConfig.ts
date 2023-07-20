import { defaultConfig } from "@portaljs/core";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const siteConfig = async () => {
  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  const userConfigObj = await S3.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: "config.json"
    })
  )

  const userConfigJSON = await userConfigObj.Body.transformToString();
  const userConfig = JSON.parse(userConfigJSON);

  // TODO types
  const siteConfig: any = {
    ...defaultConfig,
    ...userConfig,
    // prevent theme object overrides for
    // values not provided in userConfig
    theme: {
      ...defaultConfig.theme,
      ...userConfig?.theme,
    },
  };
  return siteConfig;
}

export default siteConfig;
