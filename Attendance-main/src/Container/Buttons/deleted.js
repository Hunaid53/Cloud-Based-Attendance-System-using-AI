import React, { useEffect, useState } from 'react';
import { app } from '../../Firebase/connection';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountDeletedByAdmin = () => {

  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Home';
    document.body.style.backgroundImage = 'none';
  }, []);

  const refreshPage = () => {
    navigate(-1);
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    const user = app.auth().currentUser;

    if (user) {
      try {
        setIsDeleting(true);
        await app.firestore().collection('users').doc(user.uid).delete();
        await user.delete();

        setTimeout(refreshPage, 1000);
      } catch (error) {
        prompt('Account deletion failed' + error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      style={{
        margin: '10% auto',
        maxWidth: '500px',
        textAlign: 'center',
      }}
    >
      <p>Your account has been deleted by an admin.</p>
      <p>Kindly click on the button below to delete your data.</p>
      <Button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        className="btn-hover"
        disabled={isDeleting} // Disable the button while deleting
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </Button>
    </div>
  );
};

export default AccountDeletedByAdmin;
