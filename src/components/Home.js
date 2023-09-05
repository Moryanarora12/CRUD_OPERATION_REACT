import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {Button} from '@mui/material'
import { useNavigate,Link } from "react-router-dom";


const ALL_USER = gql`
query getAllUsers{
    users {
      id
      name
      email
      password
      address
      country
      zip_code
    }
  }
`

const DELETE_USER = gql`
mutation deleteUser($id: ID!){
  deleteUser(id: $id)
}
`





export default function Home() {
  const navigate = useNavigate();
  const {loading,error,data} = useQuery(ALL_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  if(loading){
    return <p>Loading...</p>
  } 
  if(error){
    return <p>Error...</p>
  }

  const handleDelete = async(id) => {
    try{
      await deleteUser({
        variables:{id},
        refetchQueries: [{query: ALL_USER}]
      })
    }catch(error){
      console.error('error Detecting at', error);
    }
  }


  return (
    <div>
      <Button variant="contained" sx={{float: 'right'}} href="addUser">Add User</Button>
      <table width='100%' border='1'>
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>PASSWORD</th>
          <th>ADDRESS</th>
          <th>COUNTRY</th>
          <th>ZIP_CODE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </thead>
        <tbody>
            {data.users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.address}</td>
                    <td>{user.country}</td>
                    <td>{user.zip_code}</td>
                    <td><Link to={`/update/${user.id}`}>Edit</Link></td>
                    <td><a href="#" onClick={()=> handleDelete(user.id)}>Delete</a></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

