
type UserTypes = { name: string; age: number; };
declare function useState<S>(initialState: S | (() => S)): [S, (s: S) => void];

const [user, setUser] = useState<Partial<UserTypes | null>>({ name: '' });
console.log(user?.name);
