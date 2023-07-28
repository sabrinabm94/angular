export class ServiceTypeTransformation {
  static serviceTypeTransformation(serviceTypeNumber: number): string | import("./enums/ServiceType").ServiceType {
    if (serviceTypeNumber === 1) {
      return 'Presencial';
    }
    if (serviceTypeNumber === 2) {
      return 'Online';
    }
    if (serviceTypeNumber === 3) {
      return 'Ambos';
    }

    return '';
  }
}

export default ServiceTypeTransformation;
