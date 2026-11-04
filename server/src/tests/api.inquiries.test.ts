import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app";
import * as database from "../config/database";
import { ContactInquiryModel } from "../models/ContactInquiry.model";
import { QuotationRequestModel } from "../models/QuotationRequest.model";
import { SERVICE_CATEGORY_SLUGS } from "../constants/serviceCategories";

const app = createApp();

beforeEach(() => {
  vi.spyOn(database, "isDatabaseReady").mockReturnValue(true);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/v1/health", () => {
  it("returns ok without database details", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
    expect(JSON.stringify(res.body)).not.toMatch(/mongodb/i);
  });
});

describe("POST /api/v1/contact", () => {
  const validPayload = {
    fullName: "Alex Morgan",
    email: "alex@example.com",
    message: "I would like to ask about your workshop services.",
    website: "",
  };

  it("accepts a valid inquiry and persists via the model", async () => {
    const createSpy = vi
      .spyOn(ContactInquiryModel, "create")
      .mockResolvedValue({} as never);

    const res = await request(app).post("/api/v1/contact").send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(createSpy).toHaveBeenCalledOnce();
  });

  it("rejects missing contact channel", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ ...validPayload, email: "", phone: "" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ ...validPayload, email: "not-an-email" });
    expect(res.status).toBe(400);
  });

  it("rejects honeypot submissions", async () => {
    const createSpy = vi.spyOn(ContactInquiryModel, "create");
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ ...validPayload, website: "http://spam.test" });
    expect(res.status).toBe(400);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it("rejects unexpected fields", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ ...validPayload, role: "admin" });
    expect(res.status).toBe(400);
  });

  it("returns 503 when database is unavailable", async () => {
    vi.spyOn(database, "isDatabaseReady").mockReturnValue(false);
    const res = await request(app).post("/api/v1/contact").send(validPayload);
    expect(res.status).toBe(503);
    expect(res.body.error.code).toBe("SERVICE_UNAVAILABLE");
  });

  it("returns 503 when persistence fails", async () => {
    vi.spyOn(ContactInquiryModel, "create").mockRejectedValue(
      new Error("db down"),
    );
    const res = await request(app).post("/api/v1/contact").send(validPayload);
    expect(res.status).toBe(503);
  });
});

describe("POST /api/v1/quotes", () => {
  const validPayload = {
    fullName: "Sam Taylor",
    phone: "+44 7700 900123",
    serviceCategory: "kitchen-furniture",
    projectDescription:
      "Looking for a fitted kitchen for a medium-sized apartment with standard appliances.",
    website: "",
  };

  it("accepts a valid quotation request", async () => {
    const createSpy = vi
      .spyOn(QuotationRequestModel, "create")
      .mockResolvedValue({} as never);

    const res = await request(app).post("/api/v1/quotes").send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(createSpy).toHaveBeenCalledOnce();
  });

  it.each(SERVICE_CATEGORY_SLUGS)(
    "accepts service category %s",
    async (serviceCategory) => {
      vi.spyOn(QuotationRequestModel, "create").mockResolvedValue({} as never);
      const res = await request(app)
        .post("/api/v1/quotes")
        .send({ ...validPayload, serviceCategory });
      expect(res.status).toBe(201);
    },
  );

  it("rejects invalid service category", async () => {
    const res = await request(app)
      .post("/api/v1/quotes")
      .send({ ...validPayload, serviceCategory: "windows" });
    expect(res.status).toBe(400);
  });

  it("rejects short project description", async () => {
    const res = await request(app)
      .post("/api/v1/quotes")
      .send({ ...validPayload, projectDescription: "Too short" });
    expect(res.status).toBe(400);
  });

  it("rejects unexpected operator fields", async () => {
    const res = await request(app)
      .post("/api/v1/quotes")
      .send({
        ...validPayload,
        $set: { status: "approved" },
      });
    expect(res.status).toBe(400);
  });
});

describe("Unknown routes", () => {
  it("returns 404 JSON", async () => {
    const res = await request(app).get("/api/v1/unknown");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
