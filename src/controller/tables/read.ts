import { Request, Response } from 'express';
import { Table } from '../../models/tables';
import { pagination } from '../../util/pagination';

export async function readAll(req: Request, res: Response) {
  try {
    const pageAsNumber = Number(req.query.page);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    const allTables = await Table.findAll();

    return res.send(allTables);
  } catch {
    return res.status(500).send("...");
  }
}
