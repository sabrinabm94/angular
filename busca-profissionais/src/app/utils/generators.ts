export class Generators {
  static slug(object: any) {
    if (object && object.name && object.lastname && object.id) {
      object.slug = (
        object.name +
        '-' +
        object.lastname +
        '-' +
        object.id
      ).toLocaleLowerCase();
    }

    return object;
  }

  static link(object: any) {
    if (object && object.slug) {
      object.link = '/' + object.slug;
    }

    return object;
  }
}

export default Generators;
