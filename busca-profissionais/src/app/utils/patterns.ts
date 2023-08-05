export class Patterns {
  static getPasswordPattern(): string {
    return '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$';
  }
  static getCpfPattern(): string {
    return '[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}';
  }
  static getCnpjPattern(): string {
    return '[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{4}[0-9]{2}';
  }
  static getCepPattern(): string {
    return '(\d){5}(\d){3}';
  }
}

export default Patterns;
