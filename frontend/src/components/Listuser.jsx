// Importez React et useState, useEffect depuis 'react'
import React, { useState, useEffect } from 'react';
// Importez axios pour les requêtes HTTP
import axios from 'axios';
// Importez l'icône CircleX depuis 'lucide-react'
import { CircleX } from 'lucide-react';

// Définissez le composant UserAccountsTable
const UserAccountsTable = () => {
  // Définissez les états pour les utilisateurs, le chargement, les erreurs et la confirmation de suppression
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Définissez une fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/getusers/all');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Définissez une fonction pour confirmer la suppression d'un utilisateur
  const handleDeleteConfirmation = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/delete/${userId}`);
      await fetchUsers(); // Met à jour la liste des utilisateurs après la suppression
      setDeleteConfirmation(null); // Réinitialise l'état de confirmation de suppression
    } catch (err) {
      setError(err.message);
    }
  };

  // Utilisez l'effet useEffect pour charger les utilisateurs une seule fois au montage du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  // Si le chargement est en cours, affichez un message de chargement
  if (loading) {
    return <div className='text-2xl text-gray-400'>Loading...</div>;
  }

  // Si une erreur est survenue, affichez un message d'erreur
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Rendu du composant
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold my-5">User Accounts Table</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-5">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="py-2 px-4 uppercase tracking-wide">First Name</th>
            <th className="py-2 px-4 uppercase tracking-wide">Last Name</th>
            <th className="py-2 px-4 uppercase tracking-wide">Email</th>
            <th className="py-2 px-4 uppercase tracking-wide">Phone</th>
            <th className="py-2 px-4 uppercase tracking-wide">Delete User</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-3 px-4">{user.nom}</td>
              <td className="py-3 px-4">{user.prenom}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.tel}</td>
              <td className="py-3 px-4">
                {deleteConfirmation === user._id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 mt-1 text-white px-3 py-1 rounded relative left-[30%] transform translate-x-[-30%] "
                      onClick={() => handleDeleteConfirmation(user._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded  relative left-[40%] transform translate-x-[-40%] mt-1"
                      onClick={() => setDeleteConfirmation(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <CircleX
                    className="w-8 h-8 text-red-500 cursor-pointer relative left-[50%] transform translate-x-[-50%] mt-2"
                    onClick={() => setDeleteConfirmation(user._id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportez le composant UserAccountsTable
export default UserAccountsTable;
