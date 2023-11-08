export interface PaginationControls {
  page: number;
  limit: number;
}

class Paginator {
  private static convertPaginationControlsToOffsets(controls: PaginationControls) {
    const { page, limit } = controls;
    const skip = (page - 1) * limit;
    const take = skip + limit;

    return { skip, take };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getPageCount(length: number, limit: number) {
    if (length === 0) return 0;
    return Math.ceil(length / limit);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static paginate<T extends { [key: string]: any }>(data: T[], controls: PaginationControls) {
    const { skip, take } = Paginator.convertPaginationControlsToOffsets(controls);
    return data.slice(skip, take);
  }
}

export default Paginator;
