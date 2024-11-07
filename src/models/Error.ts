export enum ErrorType {
  GENERAL_ERROR = "General Error",
}

class BasicError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly title: string;
  public readonly message: string;
  public readonly url: string;
  public readonly timestamp = Date.now();

  constructor(
    name: ErrorType,
    status: number,
    url: string,
    title: string,
    message: string
  ) {
    super(message);
    this.name = name;
    this.status = status;
    this.title = title;
    this.message = message;
    this.url = url;

    this.logError();
  }

  private logError() {
    // TODO call LOGGER API
  }
}

export class GeneralError extends BasicError {
  constructor(status: number, url: string) {
    super(
      ErrorType.GENERAL_ERROR,
      status,
      url,
      "Chyba",
      "Vyskytla se nešpecifikovaná chyba."
    );
  }
}
