import { Table } from '@mantine/core';

export default function SoundsTable({ sounds }) {
  const rows = sounds.map((sound) => (
    <tr key={sound.id}>
      <td>{sound.id}</td>
      <td>{sound.name}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
