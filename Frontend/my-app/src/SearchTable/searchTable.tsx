import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import users from '../users.json'; // Assuming the JSON file is in the same directory

const SearchTable = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState(users);
  const [contributorFilter, setContributorFilter] = useState('');
  const [formatFilter, setFormatFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [coverageFilter, setCoverageFilter] = useState('');

  useEffect(() => {
    const filtered = users.filter(user =>
      (contributorFilter === '' || user.contributor === contributorFilter) &&
      (formatFilter === '' || user.format === formatFilter) &&
      (dateFilter === '' || user.date === dateFilter) &&
      (coverageFilter === '' || user.coverage === coverageFilter) &&
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchInput, contributorFilter, formatFilter, dateFilter, coverageFilter]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleContributorFilterChange = (event: SelectChangeEvent<string>) => {
    setContributorFilter(event.target.value);
  };

  const handleFormatFilterChange = (event: SelectChangeEvent<string>) => {
    setFormatFilter(event.target.value);
  };

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    setDateFilter(event.target.value);
  };

  const handleCoverageFilterChange = (event: SelectChangeEvent<string>) => {
    setCoverageFilter(event.target.value);
  };

  const uniqueContributors = [...new Set(users.map(user => user.contributor))];
  const uniqueFormats = [...new Set(users.map(user => user.format))];
  const uniqueDates = [...new Set(users.map(user => user.date))];
  const uniqueCoverages = [...new Set(users.map(user => user.coverage))];

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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <FormControl variant="outlined" style={{ flex: 1 }} margin="normal">
          <InputLabel>Contributor</InputLabel>
          <Select
            value={contributorFilter}
            onChange={handleContributorFilterChange}
            label="Contributor"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {uniqueContributors.map((contributor, index) => (
              <MenuItem key={index} value={contributor}>{contributor}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ flex: 1 }} margin="normal">
          <InputLabel>Format</InputLabel>
          <Select
            value={formatFilter}
            onChange={handleFormatFilterChange}
            label="Format"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {uniqueFormats.map((format, index) => (
              <MenuItem key={index} value={format}>{format}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ flex: 1 }} margin="normal">
          <InputLabel>Date</InputLabel>
          <Select
            value={dateFilter}
            onChange={handleDateFilterChange}
            label="Date"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {uniqueDates.map((date, index) => (
              <MenuItem key={index} value={date}>{date}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ flex: 1 }} margin="normal">
          <InputLabel>Coverage</InputLabel>
          <Select
            value={coverageFilter}
            onChange={handleCoverageFilterChange}
            label="Coverage"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {uniqueCoverages.map((coverage, index) => (
              <MenuItem key={index} value={coverage}>{coverage}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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