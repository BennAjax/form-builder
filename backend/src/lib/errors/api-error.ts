export default abstract class APIError extends Error {
  public status;

  public success;

  public meta;

  protected constructor(message: string, status: number, meta?: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.success = false;
    this.status = status;
    this.meta = meta;
  }
}
