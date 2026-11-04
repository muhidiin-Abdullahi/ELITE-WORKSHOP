import { siteConfig } from "@/config/site";
import { isApiErrorBody, type ApiResponse } from "@/types/api";

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function postJson<TBody extends object>(
  path: string,
  body: TBody,
): Promise<SubmitResult> {
  const url = `${siteConfig.apiBaseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      message:
        "Unable to reach the server. Please try again later or use another contact method if available.",
    };
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return {
      ok: false,
      message: "Unexpected response from the server. Please try again.",
    };
  }

  if (response.ok && typeof json === "object" && json !== null && "success" in json) {
    const payload = json as ApiResponse;
    if (payload.success) {
      return { ok: true };
    }
  }

  if (isApiErrorBody(json)) {
    const fieldErrors: Record<string, string> = {};
    json.error.fields?.forEach((f) => {
      fieldErrors[f.path] = f.message;
    });
    return {
      ok: false,
      message: json.error.message || "Please check your input and try again.",
      fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined,
    };
  }

  if (response.status === 404) {
    return {
      ok: false,
      message:
        "The inquiry service is not available yet. Please try again later or contact the workshop directly if contact details are listed.",
    };
  }

  if (response.status === 429) {
    return {
      ok: false,
      message: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  if (response.status >= 500) {
    return {
      ok: false,
      message:
        "The server is temporarily unavailable. Please try again later.",
    };
  }

  return {
    ok: false,
    message: "Unable to submit your request. Please try again.",
  };
}
