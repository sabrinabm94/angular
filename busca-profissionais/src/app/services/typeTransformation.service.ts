export class TypeTransformationService {
  static serviceTypeTransformation(serviceTypeNumber: number): string | import("../utils/enums/ServiceType").ServiceType {
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

export default TypeTransformationService;
