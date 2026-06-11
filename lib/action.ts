export type ActionSuccess<T> = { success: true } & T;
export type ActionError = { success: false; error: string };
export type ActionResult<T> = ActionSuccess<T> | ActionError;

export async function withAction<T extends object>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, ...data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
    return { success: false, error: message };
  }
}
