@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const user = this.userService.getUser(); // Estado do usuário já carregado
    if (user) {
      console.log('Usuário autenticado:', user);
      return true; // Permite acesso
    } else {
      console.log('Usuário não autenticado, redirecionando para login.');
      this.router.navigate(['/login']);
      return false; // Bloqueia o acesso
    }
  }
}
