// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useUploadThing } from "@/lib/uploadthing"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"

// export default function VideoUploadForm() {
//   const [file, setFile] = useState<File | null>(null)
//   const [transformationType, setTransformationType] = useState("")
//   const { startUpload, isUploading } = useUploadThing("videoUploader")
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!file || !transformationType) {
//       toast({
//         title: "Error",
//         description: "Please select a file and transformation type",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       const uploadResult = await startUpload([file])
//       if (uploadResult && uploadResult[0]) {
//         const response = await fetch("/api/process-video", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             videoUrl: uploadResult[0].url,
//             transformationType,
//           }),
//         })

//         if (!response.ok) throw new Error("Failed to process video")

//         await response.json()
//         toast({
//           title: "Success",
//           description: "Video processing started. You will be notified when it's complete.",
//         })
//       }
//     } catch (error) {
//       console.error("Error:", error)
//       toast({
//         title: "Error",
//         description: "Failed to upload and process video",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         type="file"
//         accept="video/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//         className="file:mr-4 file:py-0 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
//       />
//       {/* <Select onValueChange={(value) => setTransformationType(value)}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select transformation type" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="style_transfer">Style Transfer</SelectItem>
//           <SelectItem value="object_removal">Object Removal</SelectItem>
//           <SelectItem value="background_replacement">Background Replacement</SelectItem>
//         </SelectContent>
//       </Select> */}
//       <Input
//         type="text"
//         placeholder="Enter transformation type"
//         value={transformationType}
//         onChange={(e) => setTransformationType(e.target.value)}
//       />
//       <Button type="submit" disabled={isUploading}>
//         {isUploading ? "Uploading..." : "Upload and Process"}
//       </Button>
//     </form>
//   )
// }


// "use client";

// import { useState } from "react";
// import { useUploadThing } from "@/lib/uploadthing";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2 } from "lucide-react";

// export default function VideoProcessingUI() {
//   const [videoUrl, setVideoUrl] = useState("");
//   const [transformationType, setTransformationType] = useState("");
//   const [processedVideoUrl, setProcessedVideoUrl] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { startUpload, isUploading } = useUploadThing("videoUploader");
//   const { toast } = useToast();

//   const handleSubmit = async (e : any) => {
//     e.preventDefault();
//     if (!videoUrl || !transformationType) {
//       toast({
//         title: "Error",
//         description: "Please enter a video URL and transformation type",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const response = await fetch("/api/process-video", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoUrl, transformationType }),
//       });

//       if (!response.ok) throw new Error("Failed to process video");

//       const data = await response.json();
//       setProcessedVideoUrl(data.processedVideoUrl);
//       toast({ title: "Success", description: "Video processing complete." });
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to process video",
//         variant: "destructive",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Navigation Bar */}
//       <nav className="flex justify-center items-center p-4 bg-gray-800 text-white">
//         <h1 className="text-lg font-semibold">Video Transformer</h1>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-1 p-6 gap-6">
//         {/* Left Panel */}
//         <div className="w-1/2 flex flex-col space-y-4">
//           <Input
//             type="text"
//             placeholder="Paste video URL"
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//           />
//           <Input
//             type="text"
//             placeholder="Enter transformation type"
//             value={transformationType}
//             onChange={(e) => setTransformationType(e.target.value)}
//           />
//           <Button type="submit" onClick={handleSubmit} disabled={isUploading || isProcessing}>
//             {isUploading || isProcessing ? "Processing..." : "Upload and Process"}
//           </Button>
//         </div>

//         {/* Right Panel (Video Display) */}
//         <div className="w-1/2 flex justify-center items-center bg-gray-100 rounded-lg relative">
//           {isProcessing ? (
//             <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
//           ) : processedVideoUrl ? (
//             <video controls className="w-full h-full rounded-lg">
//               <source src={processedVideoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <p className="text-gray-500">Processed video will appear here</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2 } from "lucide-react";
// import HistoryDialog from "@/components/HistoryDialog"
// import { useUploadThing } from "@/lib/uploadthing"
// import { uploadToCloudinary } from "@/lib/cloudinary";


// export default function VideoProcessingUI() {
//   const [processedVideoUrl, setProcessedVideoUrl] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { toast } = useToast();
//   const [file, setFile] = useState<File | null>(null)
//   const [transformationType, setTransformationType] = useState("")
//   const { startUpload, isUploading } = useUploadThing("videoUploader")
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!file || !transformationType) {
//       toast({
//         title: "Error",
//         description: "Please select a file and transformation type",
//         variant: "destructive",
//       })
//       return
//     }
//     setIsProcessing(true);

//     try {
//       const uploadResult = await startUpload([file])
//       if (uploadResult && uploadResult[0]) {
//         const response = await fetch("/api/process-video", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             videoUrl: uploadResult[0].url,
//             transformationType,
//           }),
//         })
//         console.log('before throwing error in videouploadform')

//         if (!response.ok) throw new Error("Failed to process video")

//         console.log('error not thrown')

//         const data = await response.json();

//         // const cloudinaryUrl = await uploadToCloudinary(data.link);
//         setProcessedVideoUrl(data.link);
//         toast({
//           title: "Success",
//           description: "Video processed",
//         })
//       }
//     } catch (error) {
//       console.error("Error:", error)
//       toast({
//         title: "Error",
//         description: "Failed to upload and process video",
//         variant: "destructive",
//       })
//     } finally {
//       setIsProcessing(false);      
//       }
//    }

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white">
//       {/* Navigation Bar */}
//       <nav className="flex justify-between items-center p-4 bg-gray-800">
//         <h1 className="text-lg font-semibold">Video Transformer</h1>
//         <div><HistoryDialog /></div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-1 p-6 gap-6">
//         {/* Left Panel */}
//         <div className="w-1/2 bg-gray-800 p-6 rounded-lg">
//         <form onSubmit={handleSubmit} className="space-y-4">
//            <Input
//              type="file"
//              accept="video/*"
//              onChange={(e) => setFile(e.target.files?.[0] || null)}
//              className="file:mr-4 file:py-0 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
//            />
//            <Input
//              type="text"
//              placeholder="Enter transformation type"
//              value={transformationType}
//              className="text-black"
//              onChange={(e) => setTransformationType(e.target.value)}
//            />
//            <Button type="submit" disabled={isUploading}>
//              {isUploading ? "Uploading..." : "Upload and Process"}
//            </Button>
//          </form>
//          </div>
//         {/* Right Panel (Result) */}
//         <div className="w-1/2 bg-gray-800 p-6 rounded-lg flex items-center justify-center relative">
//           <h2 className="absolute top-4 left-6 text-lg font-semibold">Result</h2>
//           {isProcessing ? (
//             <Loader2 className="animate-spin h-12 w-12 text-gray-400" />
//           ) : processedVideoUrl ? (<div>
//             <video controls className="w-full rounded-lg">
//               <source src={processedVideoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <br></br>
//             <a href={processedVideoUrl} target="_blank">
//             <div className="border 1px">
//             {processedVideoUrl}</div></a>
//             </div>
//           ) : (
//             <p className="text-gray-400">Processed video will appear here</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import HistoryDialog from "@/components/HistoryDialog"
import { useUploadThing } from "@/lib/uploadthing"

export default function VideoProcessingUI() {
  const [processedVideoUrl, setProcessedVideoUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [transformationType, setTransformationType] = useState("")
  const { startUpload, isUploading } = useUploadThing("videoUploader")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !transformationType) {
      toast({
        title: "Error",
        description: "Please select a file and transformation type",
        variant: "destructive",
      })
      return
    }
    setIsProcessing(true)

    try {
      const uploadResult = await startUpload([file])
      if (uploadResult && uploadResult[0]) {
        const response = await fetch("/api/process-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoUrl: uploadResult[0].url,
            transformationType,
          }),
        })

        if (!response.ok) throw new Error("Failed to process video")

        const data = await response.json()
        setProcessedVideoUrl(data.link)
        toast({
          title: "Success",
          description: "Video processed",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to upload and process video",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-lg font-semibold">Video Transformer</h1>
        <div>
          <HistoryDialog />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 p-4 md:p-6 gap-4 md:gap-6">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 md:p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 w-full"
            />
            <Input
              type="text"
              placeholder="Enter transformation type"
              value={transformationType}
              className="text-black w-full"
              onChange={(e) => setTransformationType(e.target.value)}
            />
            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? "Uploading..." : "Upload and Process"}
            </Button>
          </form>
        </div>
        {/* Right Panel (Result) */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 md:p-6 rounded-lg flex flex-col items-center justify-center relative min-h-[300px]">
          <h2 className="absolute top-4 left-6 text-lg font-semibold">Result</h2>
          {isProcessing ? (
            <Loader2 className="animate-spin h-12 w-12 text-gray-400" />
          ) : processedVideoUrl ? (
            <div className="w-full">
              <video controls className="w-full rounded-lg">
                <source src={processedVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="mt-4 break-all">
                <a
                  href={processedVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {processedVideoUrl}
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Processed video will appear here</p>
          )}
        </div>
      </div>
    </div>
  )
}

