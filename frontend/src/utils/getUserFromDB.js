/* const getUserFromDB = async () => {
    try {
      const objet = JSON.parse(localStorage.getItem('user'));
      const iduse = objet.userObj._id;
      const response = await fetch('http://localhost:4000/api/users/'+iduse);
      const user = await response.json();
      if (response.ok ){
        return user;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

export default getUserFromDB; */ // pour le moment non

