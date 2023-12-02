function filtration(filters: { [key: string]: string }) {
  interface where {
    [key: string]: string;
  }
  let wheres: where = {};
  for (const key of Object.keys(filters)) {
    if (filters[key] !== undefined) {
      wheres[key] = filters[key];
    }
  }
  return wheres;
}
function sorting(criteria: { [key: string]: "ASC" | "DESC" }) {
  let sorted: any[] = [];
  for (const key of Object.keys(criteria)) {
    if (criteria[key] !== undefined) {
      sorted.push([key, criteria[key]]);
    }
  }
  return sorted;
}
export async function pagination(
  Table: any,
  page: number,
  attributes: string[],
  filters: {}
  // criteria: { [key: string]: "ASC" | "DESC" }
): Promise<null | object> {
  const size = 20;

  try {
    const allData = await Table.findAndCountAll({
      where: filtration(filters),
      limit: size,
      offset: page * size,
      attributes: attributes,
      // order: sorting(criteria),
    });

    return {
      records: allData.rows,
      totalPages: Math.ceil(allData.count / size),
      previousPage: page !== 0 ? page - 1 : null,
      nextPage: page == Math.ceil(allData.count / size) - 1 ? null : page + 1,
    };
  } catch {
    return null;
  }
}
