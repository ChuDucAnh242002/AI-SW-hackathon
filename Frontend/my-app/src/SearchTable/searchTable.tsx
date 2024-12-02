// Install necessary packages
// npm install @mui/material @emotion/react @emotion/styled

import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import users from '../users.json'; // Assuming the JSON file is in the same directory

const SearchTable = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState(users);

  useEffect(() => {
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchInput]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contributor</TableCell>
              <TableCell>Coverage</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Identifier</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Rights</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.contributor}</TableCell>
                <TableCell>{user.coverage}</TableCell>
                <TableCell>{user.creator}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>{user.description}</TableCell>
                <TableCell>{user.format}</TableCell>
                <TableCell>{user.identifier}</TableCell>
                <TableCell>{user.language}</TableCell>
                <TableCell>{user.publisher}</TableCell>
                <TableCell>{user.relation}</TableCell>
                <TableCell>{user.rights}</TableCell>
                <TableCell>{user.source}</TableCell>
                <TableCell>{user.subject}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchTable;