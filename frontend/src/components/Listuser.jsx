import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const UserAccountsTable = () => {
  const [users, setUsers] = useState([]);


  const getAllUsers = async() => {
    try{
      const reponse = await axios.get(`http://localhost:4000/api/users/getAllUsers`);
      setUsers(reponse.data);
      console.log(reponse.data);
    }catch (err){
      console.error(err);
    }
  }

  useEffect(() => {
    // You can fetch the data from an API or any other source and set it to the state.
    // For demonstration, I am using a mock data.
    getAllUsers();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Full Name',
        accessor: 'fullName',
      },
      {
        Header: 'User Role',
        accessor: 'role',
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: users });

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Comptes utilisateur</h2>
          <span className="text-xs text-gray-500">Affiche les comptes des utilisateurs enregistrés</span>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white bg-blue-600"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border-b border-gray-200 bg-white px-5 py-5 text-sm"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserAccountsTable;