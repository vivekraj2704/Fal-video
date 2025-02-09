import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const { videoUrl, id } = await req.json()

    // Upload processed video to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(videoUrl)

    // Update MongoDB
    const { db } = await connectToDatabase()
    await db.collection("videoProcessing").updateOne(
      { _id: id },
      {
        $set: {
          status: "completed",
          generatedVideoUrl: cloudinaryUrl,
          completedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ message: "Webhook processed successfully" })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

