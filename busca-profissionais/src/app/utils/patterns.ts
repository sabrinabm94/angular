export class Patterns {
  static getPasswordPattern(): string {
    return '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}';
  }
  static getCpfPattern(): string {
    return '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}';
  }
  static getCnpjPattern(): string {
    return '[0-9]{2}.?[0-9]{3}.?[0-9]{3}/?[0-9]{4}-?[0-9]{2}';
  }
}

export default Patterns;
