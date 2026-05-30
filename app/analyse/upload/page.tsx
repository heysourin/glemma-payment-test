"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalyseStore } from "@/store/useAnalyseStore";
import { authClient } from "@/lib/auth-client";
import SignInModal from "@/components/SignInModal";

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

export default function UploadPage() {
  const { answers } = useAnalyseStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // 🧩 Handle new image selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    if (images.length + newFiles.length > 3) {
      toast.error("You can upload a maximum of 3 images.");
      return;
    }

    const validFiles = newFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not an image.`);
        return false;
      }
      if (file.size > 4.5 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 4.5MB.`);
        return false;
      }
      return true;
    });

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random().toString(),
            file,
            url: e.target?.result as string,
            name: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // reset input so same file can be re-uploaded later
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🗑️ Remove image
  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // 🤖 Analyze images
  const analyseImages = async () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // 🔒 Auth gate — show sign-in modal if not logged in
    const { data: session } = await authClient.getSession();
    if (!session?.user) {
      setShowSignIn(true);
      return;
    }

    setAnalyzing(true);
    toast.info("Analyzing your photos...");

    try {
      const base64Images = images.map((img) => ({
        name: img.name,
        data: img.url.split(",")[1],
        mimeType: img.file.type,
      }));

      // Basic retry for transient issues and clearer errors from the server
      let res: Response | null = null;
      const MAX_RETRIES = 1;
      const RETRY_DELAY_MS = 400;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          res = await fetch("/api/analyse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              images: base64Images,
              answers,
            }),
          });
          break;
        } catch (e) {
          if (attempt < MAX_RETRIES) {
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
            continue;
          }
          throw e as Error;
        }
      }

      if (!res || !res.ok) {
        let serverMessage = `Server error during analysis (status ${res?.status ?? "unknown"})`;
        try {
          const data = await (res as Response).json();

          // Handle auth_required — show sign-in modal
          if (data?.error === "auth_required") {
            setShowSignIn(true);
            return;
          }

          // Handle limit_reached — redirect to pricing
          if (data?.error === "limit_reached") {
            toast.error(data.message || "You've reached your analysis limit.");
            router.push("/pricing");
            return;
          }

          if (data?.message) serverMessage = data.message;
          else if (data?.error) serverMessage = data.error;
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(serverMessage);
      }

      const results = await res.json();
      sessionStorage.setItem("analysisResults", JSON.stringify(results));

      const imageInfo = images.map(({ name, file }) => ({
        name,
        size: file.size,
        type: file.type,
      }));
      sessionStorage.setItem("imageInfo", JSON.stringify(imageInfo));

      toast.success("Analysis complete, redirecting...");
      router.push("/analyse/results");
    } catch (err) {
      console.error("Analysis failed:", err);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] px-6 py-16 pt-32">
      {/* Sign-in modal — appears over the page, images stay loaded */}
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />

      <div className="max-w-lg mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] uppercase mb-3">
            Final step
          </p>

          <h1 className="font-serif text-3xl mb-3">Upload your photos</h1>

          <p className="text-[#6f6259] text-sm max-w-md mx-auto">
            A clear, front-facing photo gives the most accurate skin analysis.
          </p>
        </div>

        {/* UPLOAD BOX */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="
        border border-[#e5ddd4] 
        bg-white/60 
        rounded-[2rem] 
        p-10 
        text-center 
        cursor-pointer 
        hover:bg-[#f9f4f2] 
        transition
      "
        >
          <Input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f2e7e5] flex items-center justify-center">
            <Upload className="w-6 h-6 text-[#bf908a]" />
          </div>

          <p className="font-medium mb-1">Drag & drop or click to upload</p>

          <p className="text-xs text-[#6f6259]">
            Max 3 images • Under 4.5MB each
          </p>

          <p className="text-[11px] text-[#8a7f75] mt-2">
            Your photos are not stored
          </p>
        </div>

        {/* PREVIEWS */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-xl overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  width={300}
                  height={300}
                  className="object-cover h-28 w-full"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button
            onClick={analyseImages}
            disabled={analyzing || images.length === 0}
            className="
          w-full 
          rounded-full 
          bg-[#bf908a] 
          text-white 
          py-3 
          text-sm 
          hover:opacity-90 
          transition 
          flex items-center justify-center gap-2
        "
          >
            {analyzing && <Loader2 className="animate-spin w-4 h-4" />}
            {analyzing ? "Analyzing your skin..." : "Start analysis"}
          </Button>
          <p className="md:text-sm text-xs text-[#9a8d84] leading-relaxed mt-4 max-w-xl">
            (Glemma offers non-medicated wellness insights and skincare
            recommendations only. Not medical advice. Consult a dermatologist
            for medical concerns.)
          </p>
        </div>
      </div>
    </div>
  );
}
