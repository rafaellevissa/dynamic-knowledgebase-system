export enum HTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNAUTHORIZED = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export enum UserRole {
  ADMIN = "Admin",
  EDITOR = "Editor",
  VIEWER = "Viewer",
}
