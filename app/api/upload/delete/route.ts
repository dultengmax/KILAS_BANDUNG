import crypto from "crypto";
import { NextResponse } from "next/server";

/**
 * Helper to get value from either environment variable or process.env
 */
function getEnvVar(key: string, isSecret = false): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `Cloudinary ${isSecret ? "secret " : ""}env var not set: ${key}`
    );
  }
  return val;
}

/**
 * Get Cloudinary public_id from URL, if present
 */
function extractPublicIdFromUrl(url: string): string | null {
  // Try to handle both images and videos, with possible transforms & folders
  // Supports: .../upload/v12345/folder/sub/myfile.jpg
  const cloudRegex =
    /\/upload\/(?:v\d+\/)?(.+?)\.(jpg|jpeg|png|webp|gif|mp3|wav|ogg|aac|mpeg|mp4|m4a|mov|webm|avi|flv|wmv|mkv)$/i;
  const matches = url.match(cloudRegex);
  return matches ? matches[1] : null;
}

export async function DELETE(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    if (!body || (!body.public_id && !body.url)) {
      return NextResponse.json(
        { success: false, message: "No public_id or url provided in body." },
        { status: 400 }
      );
    }

    // Determine resource_type: default to "image" for images, "video" otherwise if specified in request
    let public_id: string | null = null;
    let resource_type = "video";

    if (body.public_id) {
      public_id = body.public_id;
      resource_type = body.resource_type || "video";
    } else if (body.url) {
      public_id = extractPublicIdFromUrl(body.url);
      if (!public_id) {
        // Try fallback for URLs with unusual extensions
        return NextResponse.json(
          { success: false, message: "Could not extract public_id from url." },
          { status: 400 }
        );
      }
      // Guess resource_type from extension
      const extMatch = body.url.match(/\.(jpg|jpeg|png|webp|gif|mp3|wav|ogg|aac|mpeg|mp4|m4a|mov|webm|avi|flv|wmv|mkv)$/i);
      if (body.resource_type) {
        resource_type = body.resource_type;
      } else if (!extMatch) {
        resource_type = "video"; // fallback to "video" for non-image
      }
    }

    if (!public_id) {
      return NextResponse.json(
        { success: false, message: "No Cloudinary public_id found." },
        { status: 400 }
      );
    }

    let apiSecret: string, apiKey: string, cloudName: string;
    try {
      apiSecret = getEnvVar("NEXT_PUBLIC_CLOUDINARY_API_SECRET", true);
      apiKey = getEnvVar("NEXT_PUBLIC_CLOUDINARY_API_KEY");
      cloudName = getEnvVar("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    } catch (envErr: any) {
      return NextResponse.json(
        { success: false, message: envErr.message },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    // Cloudinary signature MUST NOT include api_secret at the end per their docs
    // https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
    // The correct stringToSign for destroy: `public_id=my_id&timestamp=TIMESTAMP`
    const stringToSign = `public_id=${public_id}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash("sha1")
      .update(`${stringToSign}${apiSecret}`)
      .digest("hex");

    const formData = new FormData();
    formData.append("public_id", public_id);
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));

    // Endpoint: resource_type is either "image" or "video"
    const destroyUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/destroy`;

    const res = await fetch(destroyUrl, {
      method: "POST",
      body: formData,
    });

    let result: any = null;
    let errorText: string | null = null;

    try {
      result = await res.json();
    } catch (err) {
      errorText = await res.text();
    }

    if (
      res.ok &&
      result &&
      (result.result === "ok" || result.result === "not found")
    ) {
      return NextResponse.json(
        { success: true, message: "Cloudinary deletion succeeded", cloudinary: result },
        { status: 200 }
      );
    } else {
      const detail = result || errorText || "Unknown error from Cloudinary";
      return NextResponse.json(
        {
          success: false,
          message: `Cloudinary deletion failed${
            res.status ? ` (status ${res.status})` : ""
          }`,
          cloudinary: detail,
          cloudinaryStatus: res.status,
          cloudinaryStatusText: res.statusText,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: typeof error === "object" && error?.message ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}