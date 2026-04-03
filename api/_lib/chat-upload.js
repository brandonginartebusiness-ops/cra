import formidable from "formidable";
import fs from "node:fs/promises";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const SUPPORTED_FILE_TYPES = {
  "text/plain": "text",
  "text/markdown": "text",
  "text/csv": "text",
  "application/json": "text",
  "image/png": "image",
  "image/jpeg": "image",
  "image/webp": "image",
};

function normalizeFieldValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function getChatUploadAccept() {
  return ".txt,.md,.csv,.json,.png,.jpg,.jpeg,.webp";
}

export function getMaxUploadBytes() {
  return MAX_UPLOAD_BYTES;
}

export function isSupportedChatFileType(mimeType) {
  return Boolean(SUPPORTED_FILE_TYPES[mimeType]);
}

export async function parseMultipartChatRequest(req) {
  const form = formidable({
    multiples: false,
    maxFiles: 1,
    maxFileSize: MAX_UPLOAD_BYTES,
    allowEmptyFiles: false,
  });

  const [fields, files] = await form.parse(req);
  const rawFile = files.file;
  const uploadedFile = Array.isArray(rawFile) ? rawFile[0] : rawFile;

  return {
    fields: {
      message: normalizeFieldValue(fields.message) ?? "",
    },
    file: uploadedFile ?? null,
  };
}

export async function buildClaudeFileAttachment(file) {
  if (!file) {
    return null;
  }

  if (!isSupportedChatFileType(file.mimetype)) {
    const error = new Error("Unsupported file type.");
    error.status = 415;
    throw error;
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    const error = new Error("Uploaded file is too large.");
    error.status = 413;
    throw error;
  }

  const fileBuffer = await fs.readFile(file.filepath);
  const fileKind = SUPPORTED_FILE_TYPES[file.mimetype];
  const safeName = typeof file.originalFilename === "string" && file.originalFilename.trim()
    ? file.originalFilename.trim().slice(0, 120)
    : "attached-file";

  if (fileKind === "image") {
    return {
      kind: "image",
      filename: safeName,
      content: {
        type: "image",
        source: {
          type: "base64",
          media_type: file.mimetype,
          data: fileBuffer.toString("base64"),
        },
      },
    };
  }

  const textContent = fileBuffer.toString("utf8").replace(/\u0000/g, "").trim();
  if (!textContent) {
    const error = new Error("Uploaded file is empty or unreadable.");
    error.status = 400;
    throw error;
  }

  return {
    kind: "text",
    filename: safeName,
    text: textContent.slice(0, 120000),
  };
}
