export class JwtHelper {
  static decodeToken(token: string | null): any | null {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) { return null; }
  }

  static isTokenExpired(token: string | null): boolean {
    const decoded = JwtHelper.decodeToken(token);
    if (!decoded) return true;
    if (!decoded.exp) return false;
    return Date.now() > decoded.exp * 1000;
  }
}
