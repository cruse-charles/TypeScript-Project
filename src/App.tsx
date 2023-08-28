import axios, { AxiosError, CanceledError } from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
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
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);
    axios
      .post("https://jsonplaceholder.typicode.com/users/", newUser)
      // .then((res) => setUsers([res.data, ...users])); => one way to do it
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

// import { useState } from "react";
// import ListGroup from "./components/ListGroup";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";
// import categories from "./expense-tracker/categories";

// function App() {
//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "aaa", amount: 10, category: "Groceries" },
//     { id: 2, description: "bbb", amount: 10, category: "Utilities" },
//     { id: 3, description: "ccc", amount: 10, category: "Utilities" },
//     { id: 4, description: "ddd", amount: 10, category: "Utilities" },
//   ]);
//   const [selectedCateogry, setSelectedCategory] = useState("All categories");
//   const visibleExpenses =
//     selectedCateogry != "All categories"
//       ? expenses.filter((expense) => expense.category === selectedCateogry)
//       : expenses;

//   return (
//     <div>
//       <div className="mb-5">
//         <ExpenseForm
//           onSubmit={(expense) =>
//             setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
//           }
//         />
//       </div>
//       <div className="mb-3">
//         <ExpenseFilter
//           onSelectCategory={(category) => setSelectedCategory(category)}
//         />
//       </div>
//       <ExpenseList
//         expenses={visibleExpenses}
//         onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
//       />
//     </div>
//   );
// }

// export default App;
