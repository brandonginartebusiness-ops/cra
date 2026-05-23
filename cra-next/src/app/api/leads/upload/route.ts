import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const BUCKET = "lead-attachments";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES_PER_REQUEST = 5;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return base || "file";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
    }

    const form = await request.formData();
    const files = form.getAll("files").filter((v): v is File => v instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }
    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        { error: `Up to ${MAX_FILES_PER_REQUEST} files per upload` },
        { status: 400 }
      );
    }

    const datePath = new Date().toISOString().slice(0, 10);
    const sessionId = crypto.randomUUID();
    const uploaded: Array<{
      name: string;
      path: string;
      size: number;
      type: string;
    }> = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `${file.name}: exceeds 10 MB limit` },
          { status: 413 }
        );
      }
      if (!ALLOWED_MIME.has(file.type)) {
        return NextResponse.json(
          { error: `${file.name}: file type "${file.type}" not allowed` },
          { status: 415 }
        );
      }

      const safeName = sanitizeFilename(file.name);
      const path = `${datePath}/${sessionId}/${Date.now()}-${safeName}`;
      const arrayBuffer = await file.arrayBuffer();

      const { error } = await supabaseServer.storage
        .from(BUCKET)
        .upload(path, arrayBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("[upload] storage error", error.message);
        return NextResponse.json(
          { error: `Failed to upload ${file.name}` },
          { status: 500 }
        );
      }

      uploaded.push({
        name: safeName,
        path,
        size: file.size,
        type: file.type,
      });
    }

    return NextResponse.json({ attachments: uploaded }, { status: 201 });
  } catch (err) {
    console.error("[upload] error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
