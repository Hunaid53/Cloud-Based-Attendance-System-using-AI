import React, { useState, useEffect, useCallback } from "react";
import { app } from "../../Firebase/connection";
import { Button, Table, Spinner } from "react-bootstrap";
import { useUserAuth } from "./../../Firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";

const PromoteFaculty = () => {
  const [users, setUsers] = useState([]);
  const [promoting, setPromoting] = useState(false);
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    const userRef = app.firestore().collection("users").where("Role","==","user");
    const snapshot = await userRef.get();

    const userData = [];

    snapshot.forEach((doc) => {
      if (doc.id !== user.uid) {
        userData.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    return userData;
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        const usersData = await fetchUsers(); // Fetch the list of users
        setUsers(usersData); // Set the users state with the retrieved data
      }
    };
    getUsers();
  }, [fetchUsers, user]);

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

  return (
    <div>
      <h1>User List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Promote</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.Name}</td>
              <td>{user.email}</td>
              <td>{user.Role}</td>
              <td>
                {promoting && <Spinner animation="border" size="sm" />}
                {!promoting && (
                  <Button onClick={() => promoteUser(user.email)}>
                    Promote
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default PromoteFaculty;
