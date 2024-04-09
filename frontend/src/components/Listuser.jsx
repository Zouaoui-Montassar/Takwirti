import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

const UserAccountsTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // You can fetch the data from an API or any other source and set it to the state.
    // For demonstration, I am using a mock data.
    const mockData = [
      {
        id: 1,
        fullName: 'mohammed moenes',
        role: 'Administrator',
        createdAt: 'Sep 30, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 2,
        fullName: 'lkaouuuu',
        role: 'Administrator',
        createdAt: 'aug 32, 2025',
        status: 'suspended',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 3,
        fullName: 'raefff',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 4,
        fullName: 'LMONTAAAAA',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'INActive',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 5,
        fullName: 'YA KHW AAD',
        role: 'USER',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 6,
        fullName: 'AAAAAAAA',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 7,
        fullName: 'BBBBBBBBBB',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 8,
        fullName: 'CCCCCCCCCCCC',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 9,
        fullName: 'DDDDDDDDDDDDDD',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      {
        id: 10,
        fullName: 'MMMMMMMMMMMMMM',
        role: 'Administrator',
        createdAt: 'Sep 28, 2022',
        status: 'Active',
        image: '/images/-ytzjgg6lxK1ICPcNfXho.png',
      },
      
      // More data
    ];

    setUsers(mockData);
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