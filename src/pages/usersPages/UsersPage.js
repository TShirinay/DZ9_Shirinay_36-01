import { useState, useEffect } from 'react';
import axios from "axios";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleCreateUser = () => {
        const newUser = { name, email, username };
        axios.post('http://localhost:8000/users', newUser)
            .then(() => {
                setModal(true);
                setName('');
                setEmail('');
                setUsername('');
            })
            .catch(error => console.error(error));
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:8000/users/${userId}`)
            .then(() => {
                setDeleteModal(true);
                setDeletedUserId(userId);
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleCreateUser}>Create User</button>

            {users.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Список пуст</p>
            )}

            {modal && (
                <div>
                    <p>Пользователь успешно создан</p>
                </div>
            )}

            {deleteModal && (
                <div>
                    <p>Пользователь удален</p>
                </div>
            )}
        </div>
    );
}

export default UsersPage;