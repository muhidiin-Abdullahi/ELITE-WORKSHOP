import type { Request, Response } from "express";

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
    },
    meta: res.locals.requestId ? { requestId: res.locals.requestId } : undefined,
  });
}
