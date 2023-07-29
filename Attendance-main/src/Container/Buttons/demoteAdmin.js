import React, { useState, useEffect, useCallback } from "react";
import { app } from "./../../Firebase/connection";
import { Button, Table, Spinner } from "react-bootstrap";
import { useUserAuth } from "./../../Firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [promoting, setPromoting] = useState(false);
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const fetchUserDocId = async (email) => {
    const querySnapshot = await app
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();
    let docId;
    querySnapshot.forEach((doc) => {
      docId = doc.id;
    });
    return docId;
  };

  const promoteUser = async (email) => {
    setPromoting(true);
    const userDocId = await fetchUserDocId(email);
    if (userDocId) {
      const userRef = app.firestore().collection("users").doc(userDocId);
      await userRef.update({
        Role: "admin",
      });
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    }
    setPromoting(false);
  };

  const demoteUser = async (id, email) => {
    setPromoting(true);
    const userDocId = await fetchUserDocId(email);
    if (userDocId) {
      const userRef = app.firestore().collection("users").doc(userDocId);
      const snapshot = await userRef.get();
      if (snapshot.exists && snapshot.data().Role === "admin") {
        await userRef.update({
          Role: "user",
        });
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      }
    }
    setPromoting(false);
  };

  const fetchUsers = useCallback(async () => {
    const userRef = app.firestore().collection("users");
    const snapshot = await userRef.get();
    const usersData = [];
    snapshot.forEach((doc) => {
      if (doc.id !== user.uid) {
        // filter out the logged-in user
        usersData.push({
          id: doc.id,
          docId: doc.id, // add the document id to the user object
          ...doc.data(),
        });
      }
    });
    return usersData;
  }, [user]);
  
  

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        const usersData = await fetchUsers();
        setUsers(usersData);
      }
    };
    getUsers();
  }, [fetchUsers, user]);
  
  

  return (
    <div>
      <h1>User List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Promote/Demote</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.subject}</td>
              <td>{user.Name}</td>
              <td>{user.email}</td>
              <td>{user.Role}</td>
              <td>
                {user.Role === "user" && (
                  <Button
                    variant="success"
                    disabled={promoting}
                    onClick={() => promoteUser(user.email)}
                  >
                    {promoting && <Spinner animation="border" size="sm" />}
                    Promote
                  </Button>
                )}
                {user.Role === "admin" && (
                  <Button
                    variant="warning"
                    disabled={promoting}
                    onClick={() => demoteUser(user.id, user.email)}
                  >
                    {promoting && <Spinner animation="border" size="sm" />}
                    Demote
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => navigate("/addFaculty")}>
        Create User
      </Button>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default UserList;
