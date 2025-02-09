// import { NextResponse } from "next/server"
// import { connectToDatabase } from "@/lib/mongodb"
// import { uploadToCloudinary } from "@/lib/cloudinary"
// import { callFalApi } from "@/lib/fal-api"

// export async function POST(req: Request) {
//   try {
//     const { videoUrl, transformationType } = await req.json()

//     // Upload to Cloudinary
//     const cloudinaryUrl = await uploadToCloudinary(videoUrl)

//     // Call Fal API
//     const falApiResponse = await callFalApi(cloudinaryUrl, transformationType)

//     // Store in MongoDB
//     const { db } = await connectToDatabase()
//     await db.collection("videoProcessing").insertOne({
//       sourceVideoUrl: cloudinaryUrl,
//       transformationType,
//       status: "processing",
//       createdAt: new Date(),
//     })

//     return NextResponse.json({ message: "Video processing started", id: falApiResponse.id })
//   } catch (error) {
//     console.error("Error processing video:", error)
//     return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_API_KEY
});

export async function POST(req: Request) {
  try {
    const { videoUrl, transformationType } = await req.json();

    // Upload video to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(videoUrl);

    // Send request to Fal API
    console.log(`the video url is : ${cloudinaryUrl}`)
    const result = await fal.subscribe("fal-ai/hunyuan-video/video-to-video", {
      input: {
        prompt: transformationType,
        video_url: cloudinaryUrl,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log('got the result');

    const videoResult = await fal.queue.result("fal-ai/hunyuan-video/video-to-video", {
      requestId: result.requestId
    });
    console.log(videoResult.data);
    console.log(videoResult.requestId);

    // Store request info in MongoDB
    const { db } = await connectToDatabase();
    await db.collection("videoProcessing").insertOne({
      sourceVideoUrl: cloudinaryUrl,
      transformationType,
      falRequestId: videoResult.data.video.url,
      status: "completed",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Video processing done", link: videoResult.data.video.url });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 });
  }
}
