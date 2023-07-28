export class PasswordPattern {
  static getPasswordPattern(): string {
    return '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}';
  }
}

export default PasswordPattern;
