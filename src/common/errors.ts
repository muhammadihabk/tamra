export class DuplicateKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateKeyError';
  }
}

export function handleDBErrors(error: any, entityName: string) {
  if (error.code === 11000) {
    throw new DuplicateKeyError(`${entityName} already exists`);
  }
}
