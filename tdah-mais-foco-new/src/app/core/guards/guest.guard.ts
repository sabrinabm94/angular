@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const user = this.userService.getUser(); // Estado do usuário já carregado
    if (!user) {
      console.log('Usuário não autenticado, permitindo acesso ao Guest.');
      return true; // Permite acesso
    } else {
      console.log('Usuário autenticado, redirecionando para a Home.');
      this.router.navigate(['/home']);
      return false; // Bloqueia o acesso
    }
  }
}
