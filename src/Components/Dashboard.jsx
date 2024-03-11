import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const TaskManagementTable = ({ taskData, onOpenDialog }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell> {/* Action column added */}
          </TableRow>
        </TableHead>
        <TableBody>
          {taskData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.institution}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onOpenDialog(row)}>
                  Write Query
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DashboardPage = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    // Fetch task data
    fetchTaskData();
  }, []);

  const fetchTaskData = () => {
    // Example task data
    const data = [
      { id: 1, name: 'John Doe', institution: 'Institution A', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', institution: 'Institution B', email: 'jane.smith@example.com' },
      // Add more members as needed
    ];
    setTaskData(data);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);

    // Fetch data based on the clicked item (replace with actual API calls)
    switch (item) {
      case 'Courses':
        setTableData([
          { id: 1, name: 'Course 1', details: 'Details of Course 1' },
          { id: 2, name: 'Course 2', details: 'Details of Course 2' },
          { id: 3, name: 'Course 3', details: 'Details of Course 3' },
          { id: 4, name: 'Course 4', details: 'Details of Course 4' },
          { id: 5, name: 'Course 5', details: 'Details of Course 5' },
        ]);
        break;
      case 'Students':
        setTableData([
          { id: 1, name: 'Student 1', details: 'Details of Student 1' },
          { id: 2, name: 'Student 2', details: 'Details of Student 2' },
          { id: 3, name: 'Student 3', details: 'Details of Student 3' },
          { id: 4, name: 'Student 4', details: 'Details of Student 4' },
          { id: 5, name: 'Student 5', details: 'Details of Student 5' },
        ]);
        break;
      case 'Institutions':
        setTableData([
          { id: 1, name: 'Institution 1', details: 'Details of Institution 1' },
          { id: 2, name: 'Institution 2', details: 'Details of Institution 2' },
          { id: 3, name: 'Institution 3', details: 'Details of Institution 3' },
          { id: 4, name: 'Institution 4', details: 'Details of Institution 4' },
          { id: 5, name: 'Institution 5', details: 'Details of Institution 5' },
        ]);
        break;
      case 'Report':
        // Logic for report data
        break;
      default:
        setTableData([]);
        break;
    }
  };

  const handleOpenDialog = (member) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMember(null);
  };

  const renderDetailsTable = () => {
    if (!selectedItem) {
      return null;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper} onClick={() => handleItemClick('Courses')}>
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <Typography variant="h4">500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper} onClick={() => handleItemClick('Institutions')}>
            <Typography variant="h6" gutterBottom>
              Institutions
            </Typography>
            <Typography variant="h4">200</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper} onClick={() => handleItemClick('Students')}>
            <Typography variant="h6" gutterBottom>
              Students
            </Typography>
            <Typography variant="h4">$5000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper} onClick={() => handleItemClick('Report')}>
            <Typography variant="h6" gutterBottom>
              Report
            </Typography>
            <Typography variant="h4">4.5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {renderDetailsTable()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Task Management
          </Typography>
          <TaskManagementTable taskData={taskData} onOpenDialog={handleOpenDialog} />
        </Grid>
      </Grid>

    
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Send Query</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your query or message to {selectedMember && selectedMember.name}.
          </DialogContentText>
          <TextareaAutosize rowsMin={3} placeholder="Write your query..." fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
