import { Images } from './images.model';

describe('Images', () => {
  // Teste de criação da instância
  it('should create an instance of Images', () => {
    const image = new Images('Sample Name', 'http://example.com/sample.jpg');
    expect(image).toBeTruthy();
  });

  // Teste dos valores do construtor
  it('should set the name and url properties correctly', () => {
    const name = 'Sample Name';
    const url = 'http://example.com/sample.jpg';
    const image = new Images(name, url);

    expect(image.name).toBe(name);
    expect(image.url).toBe(url);
  });

  // Teste para garantir que a interface Image é corretamente implementada
  it('should implement the Image interface', () => {
    const image: Images = new Images('Sample Name', 'http://example.com/sample.jpg');

    // Verifica se a classe implementa as propriedades definidas na interface
    expect((image as any).name).toBeDefined();
    expect((image as any).url).toBeDefined();
  });
});
