import {useState, useEffect} from 'react'
import userService, { User  } from '../ExampleServices/user-service';
import { CanceledError } from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    //using .then/.catch for making requests and handling errors
    // useEffect(() => {
    //   axios
    //     .get<User[]>("https://jsonplaceholder.typicode.com/users")
    //     .then((res) => setUsers(res.data))
    //     .catch((err) => setError(err.message));
    // }, []);
  
    //using async await
    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const res = await axios.get<User[]>(
    //         "https://jsonplaceholder.typicode.com/users"
    //       );
    //       setUsers(res.data);
    //     } catch (err) {
    //       setError((err as AxiosError).message);
    //     }
    //   };
    //   fetchUsers();
    // }, []);
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true);
      const { request, cancel } = userService.getAll<User>();
      request
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
  
      return () => cancel();
    }, []);

    return {users, error, isLoading, setUsers, setError}
}

export default useUsers